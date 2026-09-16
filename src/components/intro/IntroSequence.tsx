import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, FastForward } from 'lucide-react';
import { IntroState } from '../../types';

interface IntroSequenceProps {
  introState: IntroState;
  onStateChange: (state: IntroState) => void;
  onAssemblyProgress: (progress: number) => void;
  onActivationProgress: (progress: number) => void;
  onSceneOpacity: (opacity: number) => void;
  onTransitionProgress: (progress: number) => void;
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  introState,
  onStateChange,
  onAssemblyProgress,
  onActivationProgress,
  onSceneOpacity,
  onTransitionProgress,
  onComplete,
}) => {
  // DOM Refs for 2D Intro elements
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLineRef = useRef<HTMLDivElement>(null);
  const fieldExpansionRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const decadeRef = useRef<HTMLDivElement>(null);
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const firstScrollCueRef = useRef<HTMLDivElement>(null);
  const secondScrollCueRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Active GSAP Timelines
  const tlBlockARef = useRef<gsap.core.Timeline | null>(null);
  const tlBlockBRef = useRef<gsap.core.Timeline | null>(null);
  const tlBlockCRef = useRef<gsap.core.Timeline | null>(null);

  // Skip capability
  const [canSkip, setCanSkip] = useState(false);

  // Stable callbacks ref to avoid stale closures
  const callbacksRef = useRef({
    onStateChange,
    onAssemblyProgress,
    onActivationProgress,
    onSceneOpacity,
    onTransitionProgress,
    onComplete,
  });

  callbacksRef.current = {
    onStateChange,
    onAssemblyProgress,
    onActivationProgress,
    onSceneOpacity,
    onTransitionProgress,
    onComplete,
  };

  // -------------------------------------------------------------
  // GLOBAL SCROLL CONTROL & LOCKING RULE:
  // Before first scroll: DISABLED
  // During assembly & activation: DISABLED
  // After assembly: ENABLED ONLY FOR SECOND SCROLL
  // After second scroll starts: normal Home page scroll
  // -------------------------------------------------------------
  useEffect(() => {
    if (introState === 'HOME') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    // Lock scrolling on document
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Prevent wheel, touchmove, and scroll keys during locked intro states
    const preventScroll = (e: Event) => {
      // In WAIT_FIRST_SCROLL and WAIT_SECOND_SCROLL, the custom listeners handle the trigger
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
      if (keys.includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [introState]);

  // Fast-forward skip handler
  const handleSkip = useCallback(() => {
    // Kill any active timelines
    tlBlockARef.current?.kill();
    tlBlockBRef.current?.kill();
    tlBlockCRef.current?.kill();

    callbacksRef.current.onSceneOpacity(1.0);
    callbacksRef.current.onAssemblyProgress(1.0);
    callbacksRef.current.onActivationProgress(1.0);
    callbacksRef.current.onTransitionProgress(1.0);
    callbacksRef.current.onStateChange('HOME');
    callbacksRef.current.onComplete();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    console.log('[INTRO] complete');
  }, []);

  // -------------------------------------------------------------
  // BLOCK A: STATE 0 → STATE 1 → STATE 2 → STATE 3 → STATE 4 → WAIT_FIRST_SCROLL
  // Purely deterministic GSAP Timeline (0.0s to ~5.7s)
  // -------------------------------------------------------------
  useEffect(() => {
    // Enable skip button after 1s
    const skipTimer = setTimeout(() => setCanSkip(true), 1000);

    // Initial resets
    callbacksRef.current.onSceneOpacity(0.0);
    callbacksRef.current.onAssemblyProgress(0.0);
    callbacksRef.current.onActivationProgress(0.0);
    callbacksRef.current.onTransitionProgress(0.0);

    console.log('[INTRO] blank');
    callbacksRef.current.onStateChange('INTRO_BLANK');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: false,
        onComplete: () => {
          // Transition into State 4B: WAIT_FIRST_SCROLL
          console.log('[INTRO] waiting for first scroll');
          callbacksRef.current.onStateChange('WAIT_FIRST_SCROLL');

          // Reveal minimal "SCROLL DOWN" cue
          if (firstScrollCueRef.current) {
            gsap.fromTo(
              firstScrollCueRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
          }
        },
      });

      tlBlockARef.current = tl;

      // STATE 0: BLANK START (0.0s - 0.8s)
      // Screen intentionally empty with subtle header chrome fading in
      if (topBarRef.current) {
        tl.to(topBarRef.current, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.2);
      }

      // STATE 1: CENTER BURGUNDY LINE (0.8s - 1.7s)
      tl.call(() => {
        console.log('[INTRO] line');
        callbacksRef.current.onStateChange('INTRO_LINE');
      }, [], 0.8);

      if (centerLineRef.current) {
        tl.fromTo(
          centerLineRef.current,
          { width: '2px', opacity: 0 },
          {
            width: '92vw',
            opacity: 1,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          0.8
        );
      }

      // STATE 2: BURGUNDY FIELD EXPANSION (1.7s - 2.4s)
      tl.call(() => {
        console.log('[INTRO] field');
        callbacksRef.current.onStateChange('INTRO_FIELD');
      }, [], 1.7);

      if (fieldExpansionRef.current) {
        tl.fromTo(
          fieldExpansionRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
          },
          1.7
        );
      }

      // Center line dissolves into the expanding burgundy radiance
      if (centerLineRef.current) {
        tl.to(
          centerLineRef.current,
          {
            opacity: 0.2,
            duration: 0.6,
            ease: 'power1.out',
          },
          1.8
        );
      }

      // STATE 3: EVENT IDENTITY TEXT REVEAL (2.4s - 3.7s)
      tl.call(() => {
        console.log('[INTRO] text');
        callbacksRef.current.onStateChange('INTRO_TEXT');
      }, [], 2.4);

      if (typographyRef.current) {
        tl.to(typographyRef.current, { opacity: 1, duration: 0.3 }, 2.4);
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          2.45
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          2.65
        );
      }

      if (decadeRef.current) {
        tl.fromTo(
          decadeRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          2.85
        );
      }

      // STATE 4: LOADING SYSTEM & PROGRESS BAR (3.7s - 5.2s)
      tl.call(() => {
        console.log('[INTRO] loading');
        callbacksRef.current.onStateChange('INTRO_LOADING');
      }, [], 3.7);

      if (loadingContainerRef.current) {
        tl.fromTo(
          loadingContainerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          3.7
        );
      }

      // Animate progress 0% → 20% → 40% → 60% → 80% → 100%
      const progressObj = { pct: 0 };
      tl.to(
        progressObj,
        {
          pct: 100,
          duration: 1.25,
          ease: 'power1.inOut',
          onUpdate: () => {
            const currentPct = Math.round(progressObj.pct);
            if (percentTextRef.current) {
              percentTextRef.current.textContent = `${currentPct}%`;
            }
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${currentPct}%`;
            }
          },
        },
        3.75
      );

      // Hold at 100% for 0.5 seconds (until 5.5s)
      // ONLY the horizontal progress bar disappears at state 4; the main text remains visible!
      if (loadingContainerRef.current) {
        tl.to(
          loadingContainerRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.45,
            ease: 'power2.in',
          },
          5.4
        );
      }
    }, containerRef);

    return () => {
      clearTimeout(skipTimer);
      ctx.revert();
    };
  }, []);

  // -------------------------------------------------------------
  // FIRST SCROLL GESTURE HANDLER (Transitions State 4B -> State 5)
  // Single-fire listener, exactly one trigger
  // -------------------------------------------------------------
  const triggerFirstScroll = useCallback(() => {
    // Hide "SCROLL DOWN" cue
    if (firstScrollCueRef.current) {
      gsap.to(firstScrollCueRef.current, { opacity: 0, y: 15, duration: 0.3 });
    }

    // Fade out main text and center line as 3D assembly begins
    if (typographyRef.current) {
      gsap.to(typographyRef.current, {
        opacity: 0,
        y: -25,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    if (centerLineRef.current) {
      gsap.to(centerLineRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }

    // Fade out 2D field as 3D assembly begins
    if (fieldExpansionRef.current) {
      gsap.to(fieldExpansionRef.current, { opacity: 0, duration: 0.5 });
    }

    callbacksRef.current.onSceneOpacity(1.0);

    // Update state to ASSEMBLY and begin Block B
    console.log('[INTRO] assembly');
    callbacksRef.current.onStateChange('ASSEMBLY');

    // -----------------------------------------------------------
    // BLOCK B: STATE 5 (ASSEMBLY → ACTIVATION → COMPLETED COMPUTER HOLD)
    // -----------------------------------------------------------
    const tlB = gsap.timeline({
      onComplete: () => {
        // State 6: WAIT FOR SECOND SCROLL
        console.log('[INTRO] waiting for second scroll');
        callbacksRef.current.onStateChange('WAIT_SECOND_SCROLL');

        if (secondScrollCueRef.current) {
          gsap.fromTo(
            secondScrollCueRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
        }
      },
    });

    tlBlockBRef.current = tlB;

    // STATE 5A-C: Assembly progress 0.0 -> 1.0 (3.0s duration)
    // 10 components enter from edges/corners/depths, decelerate, align, overshoot, settle, lock
    const assemblyObj = { val: 0 };
    tlB.to(
      assemblyObj,
      {
        val: 1.0,
        duration: 3.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          callbacksRef.current.onAssemblyProgress(assemblyObj.val);
        },
      },
      0.0
    );

    // Brief settling pause (0.2s)
    // STATE 5D: Activation (3.2s - 4.2s)
    tlB.call(() => {
      console.log('[INTRO] activation');
      callbacksRef.current.onStateChange('ACTIVATION');
    }, [], 3.2);

    const activationObj = { val: 0 };
    tlB.to(
      activationObj,
      {
        val: 1.0,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => {
          callbacksRef.current.onActivationProgress(activationObj.val);
        },
      },
      3.2
    );

    // STATE 5E: Completed Computer Hold in Center (4.2s - 5.8s, ~1.6s)
    // Machine is complete and rotating in center
    tlB.to({}, { duration: 1.6 }, 4.2);
  }, []);

  // Listen for First Scroll during WAIT_FIRST_SCROLL
  useEffect(() => {
    if (introState !== 'WAIT_FIRST_SCROLL') return;

    let triggered = false;
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (triggered) return;
      if (e.deltaY > 10) {
        triggered = true;
        cleanup();
        triggerFirstScroll();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (triggered) return;
      const currentY = e.touches[0].clientY;
      if (touchStartY - currentY > 20) {
        triggered = true;
        cleanup();
        triggerFirstScroll();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (triggered) return;
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        triggered = true;
        cleanup();
        triggerFirstScroll();
      }
    };

    const cleanup = () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return cleanup;
  }, [introState, triggerFirstScroll]);

  // -------------------------------------------------------------
  // SECOND SCROLL GESTURE HANDLER (Transitions State 6 -> State 7 -> HOME)
  // Single-fire listener
  // -------------------------------------------------------------
  const triggerSecondScroll = useCallback(() => {
    // Hide "SCROLL TO ENTER" cue
    if (secondScrollCueRef.current) {
      gsap.to(secondScrollCueRef.current, { opacity: 0, y: 15, duration: 0.3 });
    }

    console.log('[INTRO] entering home');
    callbacksRef.current.onStateChange('ENTER_HOME');

    // -----------------------------------------------------------
    // BLOCK C: STATE 7 (TRANSITION TO HOME HERO)
    // Animates transitionProgress 0.0 -> 1.0 (2.0s duration)
    // Camera pulls back, computer drifts to right side, Home hero appears
    // -----------------------------------------------------------
    const transObj = { val: 0 };
    const tlC = gsap.timeline({
      onComplete: () => {
        console.log('[INTRO] complete');
        callbacksRef.current.onStateChange('HOME');
        callbacksRef.current.onComplete();
        // Unlock normal page scrolling
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      },
    });

    tlBlockCRef.current = tlC;

    tlC.to(
      transObj,
      {
        val: 1.0,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          callbacksRef.current.onTransitionProgress(transObj.val);
        },
      },
      0.0
    );

    // Fade out overlay container
    if (containerRef.current) {
      tlC.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        0.8
      );
    }
  }, []);

  // Listen for Second Scroll during WAIT_SECOND_SCROLL
  useEffect(() => {
    if (introState !== 'WAIT_SECOND_SCROLL') return;

    let triggered = false;
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (triggered) return;
      if (e.deltaY > 10) {
        triggered = true;
        cleanup();
        triggerSecondScroll();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (triggered) return;
      const currentY = e.touches[0].clientY;
      if (touchStartY - currentY > 20) {
        triggered = true;
        cleanup();
        triggerSecondScroll();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (triggered) return;
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        triggered = true;
        cleanup();
        triggerSecondScroll();
      }
    };

    const cleanup = () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return cleanup;
  }, [introState, triggerSecondScroll]);

  // If already in HOME, overlay is completely gone
  if (introState === 'HOME') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="intro-sequence-overlay"
      className="fixed inset-0 z-30 pointer-events-none select-none bg-transparent overflow-hidden"
    >
      {/* 1. STATE 2: BURGUNDY FIELD EXPANSION LAYER (Vertically expands from center line) */}
      <div
        ref={fieldExpansionRef}
        className="absolute inset-0 pointer-events-none opacity-0 origin-center"
        style={{
          background:
            'radial-gradient(circle 800px at 50% 50%, rgba(138, 27, 39, 0.42) 0%, rgba(108, 21, 30, 0.22) 40%, transparent 80%)',
        }}
      />

      {/* 2. STATE 1: HORIZONTAL BURGUNDY CENTER LINE */}
      <div
        ref={centerLineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.5px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(108, 21, 30, 0.4) 10%, #8A1B27 50%, rgba(108, 21, 30, 0.4) 90%, transparent 100%)',
          boxShadow: '0 0 10px rgba(138, 27, 39, 0.5), 0 0 20px rgba(108, 21, 30, 0.25)',
        }}
      />

      {/* 3. TOP STATUS BAR (Chrome styling with subtle info & Skip button) */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 right-0 px-6 sm:px-12 py-5 flex items-center justify-between opacity-0 z-40 border-b border-[#232428]/40"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#8A1B27] animate-pulse" />
          <span className="text-[11px] font-mono-tech tracking-widest text-[#A7A8AD] uppercase">
            IBM QUANTUM SYSTEM // AP_NODE_01
          </span>
        </div>

        {canSkip && (
          <button
            onClick={handleSkip}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#3A0B10] bg-[#18191D]/80 hover:bg-[#6C151E] text-[#D9D9DC] hover:text-white text-[11px] font-mono-tech tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer shadow-lg"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3 h-3 text-[#8A1B27]" />
          </button>
        )}
      </div>

      {/* 5. STATE 3: EVENT IDENTITY TEXT (Masked, Premium Editorial Typography) */}
      <div
        ref={typographyRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-0 z-20"
      >
        {/* Title masked container */}
        <div className="overflow-hidden mb-3 sm:mb-4">
          <div ref={titleRef}>
            <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F3F0] font-black uppercase">
              <span className="text-[#8A1B27] inline-block mr-3 sm:mr-4">QISKIT</span>
              FALL FEST 2026
            </h1>
          </div>
        </div>

        {/* Subtitle masked container */}
        <div className="overflow-hidden mb-3">
          <div ref={subtitleRef}>
            <p className="text-xs sm:text-sm md:text-base font-mono-tech tracking-[0.25em] text-[#D9D9DC] uppercase">
              SRM UNIVERSITY-AP <span className="text-[#8A1B27] mx-2">×</span> IBM QUANTUM
            </p>
          </div>
        </div>

        {/* Decade editorial serif tag */}
        <div className="overflow-hidden">
          <div ref={decadeRef}>
            <p className="font-serif-body italic text-sm sm:text-base md:text-lg text-[#A7A8AD]/80 tracking-wide">
              A Decade of Quantum on Cloud
            </p>
          </div>
        </div>
      </div>

      {/* 6. STATE 4: LOADING SYSTEM & PROGRESS BAR (3.7s - 5.2s) */}
      <div
        ref={loadingContainerRef}
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-72 sm:w-96 flex flex-col items-center opacity-0 z-20"
      >
        <div className="w-full flex items-center justify-between mb-2 text-[10px] sm:text-xs font-mono-tech tracking-widest text-[#A7A8AD] uppercase">
          <span>LOADING SYSTEM</span>
          <span ref={percentTextRef} className="text-[#F5F3F0] font-semibold">
            0%
          </span>
        </div>

        {/* Progress track: dark track, thin platinum outline, burgundy progress fill */}
        <div className="w-full h-[3px] bg-[#18191D] rounded-full overflow-hidden border border-[#D9D9DC]/25 p-[0.5px]">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#6C151E] to-[#8A1B27] rounded-full transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* 7. STATE 4B: "SCROLL DOWN" USER-GATED CUE */}
      {introState === 'WAIT_FIRST_SCROLL' && (
        <div
          ref={firstScrollCueRef}
          onClick={triggerFirstScroll}
          className="pointer-events-auto absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-40 cursor-pointer group select-none"
        >
          <span className="text-xs sm:text-sm font-mono-tech tracking-[0.3em] uppercase text-[#D9D9DC] group-hover:text-white transition-colors">
            SCROLL DOWN
          </span>
          <div className="w-8 h-8 rounded-full border border-[#8A1B27]/50 flex items-center justify-center bg-[#18191D]/60 backdrop-blur-sm group-hover:border-[#8A1B27] group-hover:scale-110 transition-all">
            <ChevronDown className="w-4 h-4 text-[#8A1B27] animate-bounce" />
          </div>
        </div>
      )}

      {/* 8. STATE 6: "SCROLL TO ENTER" USER-GATED CUE */}
      {introState === 'WAIT_SECOND_SCROLL' && (
        <div
          ref={secondScrollCueRef}
          onClick={triggerSecondScroll}
          className="pointer-events-auto absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-40 cursor-pointer group select-none"
        >
          <div className="px-5 py-2 rounded-full border border-[#8A1B27]/60 bg-[#080809]/80 backdrop-blur-md flex items-center gap-3 shadow-[0_0_25px_rgba(138,27,39,0.35)] group-hover:border-[#8A1B27] transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A1B27] animate-ping" />
            <span className="text-xs sm:text-sm font-mono-tech tracking-[0.25em] uppercase text-[#F5F3F0]">
              SCROLL TO ENTER
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A1B27] group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>
      )}
    </div>
  );
};
