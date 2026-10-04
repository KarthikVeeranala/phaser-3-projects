/**
 * Aicade Unified Runtime Shim for Karthik's Game Design & Development Portfolio
 * Provides robust offline fallbacks, audio cache guards, animation error boundaries,
 * and constructor-based VFXLibrary across all Phaser 3 prototypes.
 */

(function (window) {
  'use strict';

  // 1. AudioContext Auto-Resume on User Interaction
  function unlockAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && AudioCtx.state === 'suspended') {
        AudioCtx.resume().catch(() => {});
      }
      if (window.Phaser && window.Phaser.Sound && window.Phaser.Sound.BaseSoundManager) {
        if (window.Phaser.Sound.BaseSoundManager.prototype && window.Phaser.Sound.BaseSoundManager.prototype.context) {
          const ctx = window.Phaser.Sound.BaseSoundManager.prototype.context;
          if (ctx && ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
        }
      }
    } catch (e) {}
  }

  ['pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });

  // 2. Global Progress Loader
  window.displayProgressLoader = function () {
    try {
      const width =
        (this.cameras && this.cameras.main && this.cameras.main.width) ||
        (this.game && this.game.config && this.game.config.width) ||
        800;
      const height =
        (this.cameras && this.cameras.main && this.cameras.main.height) ||
        (this.game && this.game.config && this.game.config.height) ||
        600;

      const boxW = Math.min(300, width * 0.7);
      const boxH = 18;
      const x = (width - boxW) / 2;
      const y = height / 2;

      const bgBox = this.add.graphics();
      bgBox.fillStyle(0x181920, 0.85);
      bgBox.fillRoundedRect(x - 2, y - 2, boxW + 4, boxH + 4, 6);
      bgBox.lineStyle(1, 0x3f3f46, 0.6);
      bgBox.strokeRoundedRect(x - 2, y - 2, boxW + 4, boxH + 4, 6);

      const bar = this.add.graphics();

      this.load.on('progress', (val) => {
        bar.clear();
        bar.fillStyle(0xd97736, 1);
        bar.fillRoundedRect(x, y, Math.max(0, boxW * val), boxH, 4);
      });

      this.load.on('complete', () => {
        try {
          bgBox.destroy();
          bar.destroy();
        } catch (err) {}
      });
    } catch (e) {
      console.warn('Progress loader skipped:', e);
    }
  };

  // 3. Robust Class-based VFXLibrary (supports both `new VFXLibrary(scene)` and static calls)
  class VFXLibrary {
    constructor(scene) {
      this.scene = scene;
    }

    createEmitter(config) {
      return {
        explode: function () {},
        start: function () {},
        stop: function () {},
        setPosition: function () {},
        destroy: function () {}
      };
    }

    createFloatingText(x, y, text, style) {
      VFXLibrary.createFloatingText(this.scene, x, y, text, style);
    }

    screenShake(duration, intensity) {
      VFXLibrary.screenShake(this.scene, duration, intensity);
    }

    static createEmitter(scene, config) {
      return {
        explode: function () {},
        start: function () {},
        stop: function () {},
        setPosition: function () {},
        destroy: function () {}
      };
    }

    static createFloatingText(scene, x, y, text, style) {
      if (!scene || !scene.add) return;
      try {
        const txt = scene.add
          .text(x, y, text, style || { font: 'bold 16px sans-serif', fill: '#e5a93c' })
          .setOrigin(0.5);
        scene.tweens.add({
          targets: txt,
          y: y - 40,
          alpha: 0,
          duration: 750,
          ease: 'Sine.Out',
          onComplete: () => {
            try { txt.destroy(); } catch (e) {}
          }
        });
      } catch (err) {}
    }

    static screenShake(scene, duration, intensity) {
      try {
        if (scene && scene.cameras && scene.cameras.main) {
          scene.cameras.main.shake(duration || 150, intensity || 0.008);
        }
      } catch (e) {}
    }
  }

  window.VFXLibrary = VFXLibrary;

  // 4. Phaser Monkey-Patches for Audio and Animation Safety
  function patchPhaser() {
    if (!window.Phaser) return;

    // A. Audio Cache Safety Guard & Volume Reduction
    function createDummySound(key) {
      return {
        key: key || 'dummy',
        isPlaying: false,
        isPaused: false,
        totalRate: 1,
        duration: 0,
        totalDuration: 0,
        volume: 0,
        markers: {},
        currentMarker: null,
        play: function () { return this; },
        pause: function () { return this; },
        resume: function () { return this; },
        stop: function () { return this; },
        destroy: function () { return this; },
        setVolume: function () { return this; },
        setRate: function () { return this; },
        setSeek: function () { return this; },
        setLoop: function () { return this; },
        setMute: function () { return this; },
        on: function () { return this; },
        once: function () { return this; },
        off: function () { return this; },
        emit: function () { return this; },
        addListener: function () { return this; },
        removeListener: function () { return this; },
        removeAllListeners: function () { return this; }
      };
    }

    if (window.Phaser.Sound) {
      const soundClasses = [
        window.Phaser.Sound.WebAudioSoundManager,
        window.Phaser.Sound.HTML5AudioSoundManager,
        window.Phaser.Sound.BaseSoundManager,
        window.Phaser.Sound.NoAudioSoundManager
      ].filter(Boolean);

      soundClasses.forEach(cls => {
        const Proto = cls.prototype;
        if (!Proto) return;

        if (!Proto.__patchedAudioAdd) {
          const origAdd = Proto.add;
          Proto.add = function (key, config) {
            const hasCache = (this.game && this.game.cache && this.game.cache.audio && this.game.cache.audio.has(key)) ||
                             (this.cache && this.cache.audio && this.cache.audio.has(key));
            if (!hasCache) {
              console.warn(`[Aicade Runtime] Audio key "${key}" missing from cache. Returning silent dummy sound.`);
              return createDummySound(key);
            }
            const safeConfig = config ? Object.assign({}, config) : {};
            if (typeof safeConfig.volume === 'number') {
              safeConfig.volume = Math.min(safeConfig.volume, 0.25);
            } else {
              safeConfig.volume = 0.25;
            }
            try {
              const snd = origAdd.call(this, key, safeConfig);
              if (snd && typeof snd.volume === 'number') {
                snd.volume = Math.min(snd.volume, 0.25);
              }
              return snd;
            } catch (err) {
              console.warn(`[Aicade Runtime] Caught error adding sound "${key}":`, err);
              return createDummySound(key);
            }
          };
          Proto.__patchedAudioAdd = true;
        }

        if (!Proto.__patchedAudioPlay) {
          const origPlay = Proto.play;
          Proto.play = function (key, extra) {
            const hasCache = (this.game && this.game.cache && this.game.cache.audio && this.game.cache.audio.has(key)) ||
                             (this.cache && this.cache.audio && this.cache.audio.has(key));
            if (!hasCache) {
              console.warn(`[Aicade Runtime] Audio key "${key}" missing from cache on play().`);
              return false;
            }
            try {
              const safeExtra = extra ? Object.assign({}, extra) : {};
              if (typeof safeExtra.volume === 'number') {
                safeExtra.volume = Math.min(safeExtra.volume, 0.25);
              }
              return origPlay.call(this, key, safeExtra);
            } catch (err) {
              console.warn(`[Aicade Runtime] Error playing sound "${key}":`, err);
              return false;
            }
          };
          Proto.__patchedAudioPlay = true;
        }
      });

      if (window.Phaser.Sound.BaseSoundManager) {
        const BaseProto = window.Phaser.Sound.BaseSoundManager.prototype;
        if (!BaseProto.__patchedVolumeInit) {
          const origInit = BaseProto.init || function() {};
          BaseProto.init = function() {
            origInit.apply(this, arguments);
            this.volume = 0.25;
          };
          BaseProto.__patchedVolumeInit = true;
        }
      }
    }

    // B. Animation Frame Safety Guard
    if (window.Phaser.Animations && window.Phaser.Animations.AnimationState) {
      const AnimProto = window.Phaser.Animations.AnimationState.prototype;
      if (!AnimProto.__patchedAnimPlay) {
        const origPlay = AnimProto.play;
        AnimProto.play = function (key, ignoreIfPlaying) {
          try {
            const animKey = typeof key === 'string' ? key : (key && key.key);
            const anim = this.animationManager ? this.animationManager.get(animKey) : null;
            if (!anim || !anim.frames || anim.frames.length === 0) {
              console.warn(`[Aicade Runtime] Animation "${animKey}" missing or has no frames. Skipping play.`);
              return this.parent || this;
            }
            return origPlay.call(this, key, ignoreIfPlaying);
          } catch (err) {
            console.warn(`[Aicade Runtime] Caught error playing animation "${key}":`, err);
            return this.parent || this;
          }
        };
        AnimProto.__patchedAnimPlay = true;
      }
    }
  }

  // Attempt patching immediately and whenever DOM scripts load
  patchPhaser();
  window.addEventListener('load', patchPhaser);
  setInterval(patchPhaser, 300);

  // 5. Parent Portfolio Window Event Messaging
  window.addEventListenersPhaser = function (game) {
    window.addEventListener('message', (event) => {
      if (!event.data || !game) return;
      if (event.data.type === 'PAUSE_GAME') {
        game.isPaused = true;
        if (game.sound) game.sound.pauseAll();
      } else if (event.data.type === 'RESUME_GAME') {
        game.isPaused = false;
        if (game.sound) game.sound.resumeAll();
      } else if (event.data.type === 'MUTE_AUDIO') {
        if (game.sound) game.sound.mute = event.data.value;
      }
    });
  };

  window.initiateGameOver = function (data) {
    try {
      window.parent.postMessage({ type: 'AICADE_GAME_OVER', data: data }, '*');
    } catch (e) {}
  };

  window.handlePauseGame = function (isPaused) {
    try {
      window.parent.postMessage({ type: 'AICADE_GAME_PAUSED', isPaused: isPaused }, '*');
    } catch (e) {}
  };

  // Safe global fallback for BraincadeSDK
  window.BraincadeSDK = window.BraincadeSDK || {
    init: function () { return Promise.resolve(); },
    ready: function () { return Promise.resolve(); }
  };

})(window);
