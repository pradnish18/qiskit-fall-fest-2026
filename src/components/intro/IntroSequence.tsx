import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { FastForward, ChevronDown } from 'lucide-react';
import { IntroState } from '../../types';

interface IntroSequenceProps {
  introState: IntroState;
  onStateChange: (state: IntroState) => void;
  onActivationProgress: (progress: number) => void;
  onSceneOpacity: (opacity: number) => void;
  onTransitionProgress: (progress: number) => void;
  onComplete: () => void;
}

interface ComponentData {
  id: '01' | '02' | '03' | '04';
  state: IntroState;
  number: string;
  name: string;
  description: string;
  positionSide: 'left' | 'right';
  targetPercent: { x: number; y: number }; // Model anchor point % of viewport
  boxStyle: { top: string; left?: string; right?: string };
}

const COMPONENTS: ComponentData[] = [
  {
    id: '01',
    state: 'COMPONENT_01',
    number: '01',
    name: 'UPPER CRYOGENIC STRUCTURE',
    description: 'Layered cooling and shielding assembly.',
    positionSide: 'right',
    targetPercent: { x: 50, y: 21 },
    boxStyle: { top: '15%', right: '10%' },
  },
  {
    id: '02',
    state: 'COMPONENT_02',
    number: '02',
    name: 'PRECISION SUPPORT PLATES',
    description: 'Machined stages that support the internal hardware.',
    positionSide: 'left',
    targetPercent: { x: 48, y: 31 },
    boxStyle: { top: '26%', left: '10%' },
  },
  {
    id: '03',
    state: 'COMPONENT_03',
    number: '03',
    name: 'SIGNAL & CONTROL WIRING',
    description: 'Fine connections routed through the system.',
    positionSide: 'right',
    targetPercent: { x: 53, y: 43 },
    boxStyle: { top: '40%', right: '10%' },
  },
  {
    id: '04',
    state: 'COMPONENT_04',
    number: '04',
    name: 'QUANTUM CORE REGION',
    description: 'Central hardware area where the quantum device is housed.',
    positionSide: 'left',
    targetPercent: { x: 47, y: 58 },
    boxStyle: { top: '54%', left: '10%' },
  },
];

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  introState,
  onStateChange,
  onActivationProgress,
  onSceneOpacity,
  onTransitionProgress,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLineRef = useRef<HTMLDivElement>(null);
  const fieldExpansionRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Masked typography refs
  const typographyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const decadeRef = useRef<HTMLDivElement>(null);

  // Loading progress bar refs
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);

  // GSAP timelines
  const tlIntroRef = useRef<gsap.core.Timeline | null>(null);
  const tlRevealRef = useRef<gsap.core.Timeline | null>(null);
  const tlTransitionRef = useRef<gsap.core.Timeline | null>(null);

  // Cooldown / Debounce timestamp to prevent multi-skipping during scroll
  const lastScrollTime = useRef<number>(0);

  // Skip button state
  const [canSkip, setCanSkip] = useState(false);

  // Stable callbacks ref
  const callbacksRef = useRef({
    onStateChange,
    onActivationProgress,
    onSceneOpacity,
    onTransitionProgress,
    onComplete,
  });

  callbacksRef.current = {
    onStateChange,
    onActivationProgress,
    onSceneOpacity,
    onTransitionProgress,
    onComplete,
  };

  // ---------------------------------------------------------------------------
  // GLOBAL SCROLL LOCKING:
  // Strictly locked for all intro & exploration phases. Unlocked ONLY in HOME!
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (introState === 'HOME') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [introState]);

  // Fast-forward skip handler to go straight to Home
  const handleSkip = useCallback(() => {
    tlIntroRef.current?.kill();
    tlRevealRef.current?.kill();
    tlTransitionRef.current?.kill();

    callbacksRef.current.onSceneOpacity(1.0);
    callbacksRef.current.onActivationProgress(1.0);
    callbacksRef.current.onTransitionProgress(1.0);
    callbacksRef.current.onStateChange('HOME');
    callbacksRef.current.onComplete();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  // ---------------------------------------------------------------------------
  // 1. AUTO INTRO TIMELINE
  // 0.0s - 0.8s: Blank #080809 screen
  // 0.8s - 1.5s: Thin burgundy line expands horizontally from center
  // 1.5s - 2.2s: Burgundy field vertically expands to fill screen; line fades
  // 2.2s - 3.6s: Text reveals: QISKIT FALL FEST 2026, SRM × IBM, A Decade of Quantum
  // 3.6s - 5.0s: Loading bar runs 0% → 100%
  // 5.0s - 5.4s: Hold at 100%
  // 5.4s - 5.8s: Text and loading bar disappear completely
  // 5.8s: STOP and transition to WAIT_EXPLORE
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const skipTimer = setTimeout(() => setCanSkip(true), 1200);

    // Initial resets
    callbacksRef.current.onSceneOpacity(0.0);
    callbacksRef.current.onActivationProgress(0.0);
    callbacksRef.current.onTransitionProgress(0.0);
    callbacksRef.current.onStateChange('INTRO');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: false,
        onComplete: () => {
          // Automatic intro finished -> stop and wait for user's first scroll
          callbacksRef.current.onStateChange('WAIT_EXPLORE');
        },
      });

      tlIntroRef.current = tl;

      // Top status bar chrome fades in softly
      if (topBarRef.current) {
        tl.to(topBarRef.current, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.2);
      }

      // 2. AUTO — BURGUNDY LINE (~0.8–1.5s):
      // A very thin deep-burgundy line starts from exact center and expands horizontally
      if (centerLineRef.current) {
        tl.fromTo(
          centerLineRef.current,
          { width: '0px', opacity: 0 },
          {
            width: '92vw',
            opacity: 1,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          0.8
        );
      }

      // 3. AUTO — BURGUNDY FIELD (~1.5–2.2s):
      // The burgundy glow expands vertically from that line until it fills the screen. Line fades away.
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
          1.5
        );
      }

      if (centerLineRef.current) {
        tl.to(
          centerLineRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out',
          },
          1.7
        );
      }

      // 4. AUTO — EVENT TEXT (~2.2–3.6s):
      // Editorial reveal: Qiskit Fall Fest 2026, SRM × IBM, Decade on Cloud
      // Uses smooth exponential/power3 easing for cinematic, fluid entrance without snapping
      if (typographyRef.current) {
        tl.to(typographyRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 2.2);
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          2.25
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
          2.55
        );
      }

      if (decadeRef.current) {
        tl.fromTo(
          decadeRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          2.85
        );
      }

      // 5. AUTO — LOADING BAR (~3.6–5.2s):
      // Thin horizontal loading bar and percentage genuinely animating 0% → 100%
      if (loadingContainerRef.current) {
        tl.fromTo(
          loadingContainerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          3.6
        );
      }

      const progressObj = { pct: 0 };
      tl.to(
        progressObj,
        {
          pct: 100,
          duration: 1.4,
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
        3.65
      );

      // At 100%, hold briefly, then smoothly fade out the horizontal loading UI:
      if (loadingContainerRef.current) {
        tl.to(
          loadingContainerRef.current,
          {
            opacity: 0,
            y: 8,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          5.1
        );
      }
    }, containerRef);

    return () => {
      clearTimeout(skipTimer);
      ctx.revert();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // 2. FIRST USER SCROLL -> DIRECTLY TO COMPONENT_01 (EXPLORE THE QUANTUM COMPUTER)
  // Eliminates the intermediate blank holding section so the user directly enters
  // the "EXPLORE THE QUANTUM COMPUTER" section upon first scroll.
  // ---------------------------------------------------------------------------
  const triggerExplore = useCallback(() => {
    // Gracefully fade out event title text as quantum computer and explore UI reveal
    if (typographyRef.current) {
      gsap.to(typographyRef.current, {
        opacity: 0,
        y: -24,
        scale: 0.98,
        duration: 0.75,
        ease: 'power2.inOut',
      });
    }

    // Activate 3D scene directly
    callbacksRef.current.onSceneOpacity(1.0);
    callbacksRef.current.onActivationProgress(1.0);

    // Go directly to COMPONENT_01 ("EXPLORE THE QUANTUM COMPUTER")
    callbacksRef.current.onStateChange('COMPONENT_01');
  }, []);

  // ---------------------------------------------------------------------------
  // 3. TRANSITION TO COMPLETE_COMPUTER -> WAIT_ENTER
  // After component 04, restores whole machine to normal appearance,
  // runs subtle activation, holds centered for ~1.5s, then shows SCROLL TO ENTER.
  // ---------------------------------------------------------------------------
  const triggerCompleteComputer = useCallback(() => {
    callbacksRef.current.onStateChange('COMPLETE_COMPUTER');

    // Restore full brilliance
    callbacksRef.current.onActivationProgress(1.0);

    // Hold centered for ~1.5s, then advance to WAIT_ENTER
    setTimeout(() => {
      callbacksRef.current.onStateChange('WAIT_ENTER');
    }, 1500);
  }, []);

  // ---------------------------------------------------------------------------
  // 4. FINAL SCROLL -> ENTER_HOME
  // Smooth continuous transition of the same 3D computer into the right side
  // of Home hero while camera pulls back and Home content reveals on left.
  // ---------------------------------------------------------------------------
  const triggerEnterHome = useCallback(() => {
    callbacksRef.current.onStateChange('ENTER_HOME');

    const transObj = { val: 0 };
    const tlTrans = gsap.timeline({
      onComplete: () => {
        callbacksRef.current.onStateChange('HOME');
        callbacksRef.current.onComplete();
        // Unlock normal page scrolling
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      },
    });

    tlTransitionRef.current = tlTrans;

    tlTrans.to(
      transObj,
      {
        val: 1.0,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          callbacksRef.current.onTransitionProgress(transObj.val);
        },
      },
      0.0
    );

    // Fade out overlay container
    if (containerRef.current) {
      tlTrans.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        0.8
      );
    }
  }, []);

  // ---------------------------------------------------------------------------
  // COMPONENT EXPLORATION NAVIGATION (Forward / Backward)
  // Advances strictly ONE component per scroll event with cooldown gating.
  // ---------------------------------------------------------------------------
  const advanceComponent = useCallback(
    (direction: 'next' | 'prev') => {
      const now = Date.now();
      if (now - lastScrollTime.current < 650) return; // 650ms debounce
      lastScrollTime.current = now;

      if (direction === 'next') {
        if (introState === 'WAIT_EXPLORE') {
          triggerExplore();
        } else if (introState === 'COMPONENT_01') {
          callbacksRef.current.onStateChange('COMPONENT_02');
        } else if (introState === 'COMPONENT_02') {
          callbacksRef.current.onStateChange('COMPONENT_03');
        } else if (introState === 'COMPONENT_03') {
          callbacksRef.current.onStateChange('COMPONENT_04');
        } else if (introState === 'COMPONENT_04') {
          triggerCompleteComputer();
        } else if (introState === 'WAIT_ENTER') {
          triggerEnterHome();
        }
      } else if (direction === 'prev') {
        if (introState === 'COMPONENT_04') {
          callbacksRef.current.onStateChange('COMPONENT_03');
        } else if (introState === 'COMPONENT_03') {
          callbacksRef.current.onStateChange('COMPONENT_02');
        } else if (introState === 'COMPONENT_02') {
          callbacksRef.current.onStateChange('COMPONENT_01');
        }
      }
    },
    [introState, triggerExplore, triggerCompleteComputer, triggerEnterHome]
  );

  // ---------------------------------------------------------------------------
  // SCROLL & GESTURE EVENT LISTENER
  // Intercepts wheel, touch, and arrow keys to step through the state machine.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (introState === 'HOME' || introState === 'INTRO' || introState === 'COMPUTER_REVEAL' || introState === 'COMPLETE_COMPUTER' || introState === 'ENTER_HOME') {
      // Auto phases or normal scrolling: do not listen for step events
      return;
    }

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 6) return;
      if (e.deltaY > 0) {
        advanceComponent('next');
      } else {
        advanceComponent('prev');
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;
      if (Math.abs(diff) > 25) {
        if (diff > 0) {
          advanceComponent('next');
        } else {
          advanceComponent('prev');
        }
        touchStartY = currentY;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        advanceComponent('next');
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        advanceComponent('prev');
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [introState, advanceComponent]);

  // Current active component data if in exploration mode
  const activeCompData = COMPONENTS.find((c) => c.state === introState);

  // If already reached HOME, overlay is completely gone
  if (introState === 'HOME') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="intro-sequence-overlay"
      className="fixed inset-0 z-30 pointer-events-none select-none bg-transparent overflow-hidden"
    >
      {/* 1. BURGUNDY FIELD EXPANSION LAYER */}
      <div
        ref={fieldExpansionRef}
        className="absolute inset-0 pointer-events-none opacity-0 origin-center"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(138, 27, 39, 0.42) 0%, rgba(108, 21, 30, 0.22) 45%, transparent 80%)',
        }}
      />

      {/* 2. HORIZONTAL BURGUNDY CENTER LINE */}
      <div
        ref={centerLineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.5px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(108, 21, 30, 0.4) 10%, #8A1B27 50%, rgba(108, 21, 30, 0.4) 90%, transparent 100%)',
          boxShadow: '0 0 10px rgba(138, 27, 39, 0.5), 0 0 20px rgba(108, 21, 30, 0.25)',
        }}
      />

      {/* 3. TOP BAR (Skip action) */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 right-0 px-6 sm:px-12 py-5 flex items-center justify-end opacity-0 z-40"
      >
        {canSkip && introState !== 'ENTER_HOME' && (
          <button
            onClick={handleSkip}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#3A0B10] bg-[#18191D]/80 hover:bg-[#6C151E] text-[#D9D9DC] hover:text-white text-[11px] font-mono-tech tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer shadow-lg"
          >
            <span>Skip to Home</span>
            <FastForward className="w-3 h-3 text-[#FF6B7A]" />
          </button>
        )}
      </div>

      {/* 4. EVENT IDENTITY TEXT (Masked Editorial Typography - AUTO INTRO) */}
      <div
        ref={typographyRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-0 z-20"
      >
        <div className="overflow-hidden mb-3 sm:mb-4">
          <div ref={titleRef}>
            <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F3F0] font-black uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              <span className="text-[#FF5C6C] inline-block mr-3 sm:mr-4 drop-shadow-[0_0_20px_rgba(255,92,108,0.5)]">QISKIT</span>
              FALL FEST 2026
            </h1>
          </div>
        </div>

        <div className="overflow-hidden mb-3">
          <div ref={subtitleRef}>
            <p className="text-xs sm:text-sm md:text-base font-mono-tech tracking-[0.25em] text-[#D9D9DC] uppercase">
              SRM UNIVERSITY-AP <span className="text-[#FF6B7A] mx-2 font-bold">×</span> IBM QUANTUM
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={decadeRef}>
            <p className="font-serif-body italic text-sm sm:text-base md:text-lg text-[#A7A8AD]/80 tracking-wide">
              A Decade of Quantum on Cloud
            </p>
          </div>
        </div>
      </div>

      {/* 5. LOADING SYSTEM & PROGRESS BAR (AUTO INTRO) */}
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

        <div className="w-full h-[3px] bg-[#18191D] rounded-full overflow-hidden border border-[#D9D9DC]/25 p-[0.5px]">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#6C151E] to-[#8A1B27] rounded-full transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 6. WAIT_EXPLORE: "SCROLL TO EXPLORE ↓" (Replacing horizontal loading) */}
      {/* Matches user reference image directly below event typography          */}
      {/* ===================================================================== */}
      {introState === 'WAIT_EXPLORE' && (
        <div
          onClick={() => advanceComponent('next')}
          className="pointer-events-auto absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3.5 z-40 cursor-pointer group select-none animate-smooth-in"
        >
          <span className="text-xs sm:text-sm font-mono-tech tracking-[0.35em] uppercase text-[#F5F3F0] group-hover:text-white transition-colors duration-300">
            SCROLL TO EXPLORE
          </span>
          <div className="w-10 h-10 rounded-full border border-[#8A1B27] flex items-center justify-center bg-[#131417]/95 backdrop-blur-md group-hover:border-[#B3192B] group-hover:scale-105 transition-all duration-300 shadow-[0_0_18px_rgba(138,27,39,0.35)]">
            <ChevronDown className="w-4 h-4 text-[#8A1B27] group-hover:text-[#B3192B] animate-bounce" />
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 7. COMPONENT EXPLORATION OVERLAYS (01 → 02 → 03 → 04)                 */}
      {/* Responsive layout: cleanly adapted for mobile and desktop screens     */}
      {/* ===================================================================== */}
      {activeCompData && (
        <>
          {/* Header & Step Indicators: Responsive header bar */}
          <div className="absolute top-16 md:top-20 left-4 sm:left-6 md:left-14 right-4 sm:right-6 md:right-14 z-30 flex items-start justify-between pointer-events-none animate-smooth-fade">
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-xs font-mono-tech tracking-[0.25em] text-[#A7A8AD] uppercase mb-0.5">
                EXPLORE THE
              </p>
              <h2 className="font-serif-title text-xl sm:text-2xl md:text-4xl text-[#F5F3F0] font-light leading-tight tracking-tight uppercase">
                <span className="text-[#FF5C6C] md:block font-bold mr-1.5 md:mr-0 drop-shadow-[0_0_12px_rgba(255,92,108,0.4)]">QUANTUM</span>
                COMPUTER
              </h2>
              <p className="text-[11px] md:text-xs font-serif-body italic text-[#A7A8AD]/70 mt-0.5 hidden sm:block">
                Scroll to discover each layer.
              </p>
            </div>

            {/* Component Step Indicators (01 / 04) */}
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 pt-1">
              {COMPONENTS.map((c) => {
                const isActive = c.state === introState;
                return (
                  <button
                    key={c.id}
                    onClick={() => callbacksRef.current.onStateChange(c.state)}
                    className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full border transition-all duration-300 text-[10px] sm:text-[11px] font-mono-tech cursor-pointer ${
                      isActive
                        ? 'border-[#8A1B27] bg-[#8A1B27]/30 text-white shadow-[0_0_12px_rgba(138,27,39,0.5)]'
                        : 'border-[#3A0B10]/60 bg-[#18191D]/50 text-[#A7A8AD] hover:border-[#8A1B27]/50'
                    }`}
                  >
                    <span>{c.number}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SVG Callout Connecting Line (Desktop) */}
          <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-20">
            {/* Ambient concentric quantum alignment rings */}
            <circle
              cx="50%"
              cy="45%"
              r="28%"
              fill="none"
              stroke="#8A1B27"
              strokeWidth="1"
              strokeOpacity="0.12"
              strokeDasharray="4 6"
            />
            <circle
              cx="50%"
              cy="45%"
              r="40%"
              fill="none"
              stroke="#8A1B27"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />

            {/* Target anchor glow dot on the 3D model */}
            <circle
              cx={`${activeCompData.targetPercent.x}%`}
              cy={`${activeCompData.targetPercent.y}%`}
              r="4.5"
              fill="#8A1B27"
              className="animate-ping"
              opacity="0.4"
            />
            <circle
              cx={`${activeCompData.targetPercent.x}%`}
              cy={`${activeCompData.targetPercent.y}%`}
              r="3.5"
              fill="#FFFFFF"
              stroke="#8A1B27"
              strokeWidth="2"
            />

            {/* Elbow Line connecting text box to target point on model */}
            {activeCompData.positionSide === 'right' ? (
              <polyline
                points={`
                  ${window.innerWidth > 768 ? window.innerWidth * 0.72 : window.innerWidth * 0.82},${window.innerHeight * (parseInt(activeCompData.boxStyle.top) / 100 + 0.03)}
                  ${window.innerWidth * (activeCompData.targetPercent.x / 100 + 0.1)},${window.innerHeight * (activeCompData.targetPercent.y / 100)}
                  ${window.innerWidth * (activeCompData.targetPercent.x / 100)},${window.innerHeight * (activeCompData.targetPercent.y / 100)}
                `}
                fill="none"
                stroke="#8A1B27"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="0"
                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            ) : (
              <polyline
                points={`
                  ${window.innerWidth > 768 ? window.innerWidth * 0.28 : window.innerWidth * 0.25},${window.innerHeight * (parseInt(activeCompData.boxStyle.top) / 100 + 0.03)}
                  ${window.innerWidth * (activeCompData.targetPercent.x / 100 - 0.1)},${window.innerHeight * (activeCompData.targetPercent.y / 100)}
                  ${window.innerWidth * (activeCompData.targetPercent.x / 100)},${window.innerHeight * (activeCompData.targetPercent.y / 100)}
                `}
                fill="none"
                stroke="#8A1B27"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="0"
                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            )}
          </svg>

          {/* Callout Text Box:
              - Mobile: positioned at bottom above the scroll prompt to leave the 3D model completely visible
              - Desktop: floating at side coordinates with SVG callout line
              - Animated with smooth-in keyframe keyed by activeCompData.id for fluid re-entrance
          */}
          <div
            key={activeCompData.id}
            className="absolute z-30 pointer-events-auto w-[calc(100%-2rem)] max-w-sm left-4 right-4 bottom-24 mx-auto md:w-auto md:left-auto md:right-auto md:bottom-auto animate-smooth-in"
            style={typeof window !== 'undefined' && window.innerWidth >= 768 ? activeCompData.boxStyle : undefined}
          >
            <div className="p-3.5 sm:p-4 md:p-5 rounded-lg border border-[#8A1B27]/40 bg-[#080809]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(108,21,30,0.3)] transition-all duration-500">
              {/* Component Number / Layer badge */}
              <div className="flex items-center justify-between md:block mb-1">
                <span className="text-xs sm:text-sm md:text-base font-mono-tech font-bold text-[#FF6B7A] block">
                  {activeCompData.number}
                </span>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#A7A8AD]/80 md:hidden">
                  LAYER {activeCompData.number} OF 04
                </span>
              </div>

              {/* Component Name */}
              <h3 className="font-serif-title text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#F5F3F0] uppercase tracking-wide mb-1 leading-snug">
                {activeCompData.name}
              </h3>

              {/* Short 1-2 line description */}
              <p className="text-xs sm:text-sm font-serif-body text-[#D9D9DC]/90 leading-relaxed">
                {activeCompData.description}
              </p>
            </div>
          </div>

          {/* Bottom Prompt: SCROLL TO EXPLORE NEXT LAYER */}
          <div
            onClick={() => advanceComponent('next')}
            className="pointer-events-auto absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-40 cursor-pointer group select-none animate-smooth-fade"
          >
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-[0.25em] uppercase text-[#A7A8AD] group-hover:text-white transition-colors duration-300">
              {activeCompData.id === '04' ? 'SCROLL TO COMPLETE' : 'SCROLL TO DISCOVER NEXT LAYER'}
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#FF6B7A]/50 flex items-center justify-center bg-[#18191D]/70 backdrop-blur-sm group-hover:border-[#FF6B7A] group-hover:scale-110 transition-all duration-300">
              <ChevronDown className="w-3.5 h-3.5 text-[#FF6B7A] animate-bounce" />
            </div>
          </div>
        </>
      )}

      {/* ===================================================================== */}
      {/* 8. COMPLETE_COMPUTER: Full machine subtle activation & hold (~1.5s)   */}
      {/* ===================================================================== */}
      {introState === 'COMPLETE_COMPUTER' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-4">
          <div className="text-center animate-smooth-scale px-6 sm:px-8 py-4 sm:py-5 rounded-xl bg-[#08080A]/85 backdrop-blur-md border border-[#FF6B7A]/30 shadow-[0_0_50px_rgba(0,0,0,0.85),0_0_20px_rgba(255,107,122,0.2)]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D61] animate-pulse" />
              <span className="text-xs sm:text-sm font-mono-tech tracking-[0.3em] uppercase text-[#FF8594] font-semibold drop-shadow-[0_0_10px_rgba(255,133,148,0.7)]">
                SYSTEM RE-SYNCHRONIZATION
              </span>
            </div>
            <h2 className="font-serif-title text-xl sm:text-3xl text-[#FFFFFF] font-light uppercase tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              QUANTUM CHANDELIER ACTIVE
            </h2>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 9. WAIT_ENTER: "SCROLL TO ENTER ↓"                                   */}
      {/* ===================================================================== */}
      {introState === 'WAIT_ENTER' && (
        <div
          onClick={() => triggerEnterHome()}
          className="pointer-events-auto absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-40 cursor-pointer group select-none animate-smooth-in"
        >
          <div className="px-6 py-2.5 rounded-full border border-[#FF6B7A]/50 bg-[#080809]/90 backdrop-blur-md flex items-center gap-3 shadow-[0_0_30px_rgba(255,107,122,0.35)] group-hover:scale-105 group-hover:border-[#FF6B7A] transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#FF4D61] animate-ping" />
            <span className="text-xs sm:text-sm font-mono-tech tracking-[0.25em] uppercase text-[#F5F3F0] font-semibold">
              SCROLL TO ENTER
            </span>
            <ChevronDown className="w-4 h-4 text-[#FF6B7A] group-hover:translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      )}
    </div>
  );
};
