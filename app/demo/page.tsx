"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Shuffle,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { assetPath, machines, type MachineId, type Product } from "./catalogue";
import "./demo.css";

type Stage = "select" | "dispensing" | "ready" | "reveal";

function Photo({
  file,
  alt,
  className = "",
  eager = false,
}: {
  file: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setFailed(false);
    setLoaded(
      !!imageRef.current?.complete && imageRef.current.naturalWidth > 0,
    );
  }, [file]);
  return (
    <span
      aria-busy={!loaded && !failed}
      className={`demo-photo ${className} ${loaded ? "loaded" : ""}`}
    >
      {failed ? (
        <span className="photo-fallback" role="img" aria-label={alt}>
          Image unavailable<span>{alt}</span>
        </span>
      ) : (
        <img
          ref={imageRef}
          src={assetPath(file)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export default function Demo() {
  const [machineId, setMachineId] = useState<MachineId | null>(null);
  const [selectedId, setSelectedId] = useState("pandan");
  const [stage, setStage] = useState<Stage>("select");
  const [sound, setSound] = useState(false);
  const [still, setStill] = useState(false);
  const [round, setRound] = useState(0);
  const [vendCount, setVendCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busy = useRef(false);
  const audio = useRef<AudioContext | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dispenseButton = useRef<HTMLButtonElement>(null);
  const chooseHeading = useRef<HTMLHeadingElement>(null);
  const machineHeading = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const quiet = !!reduced || still;
  const machine = machines.find((m) => m.id === machineId) ?? machines[0];
  const selected: Product = machine.products.find((p) => p.id === selectedId) ??
    machine.products[0] ?? {
      id: "",
      name: "No selection",
      image: "",
      description: "",
      source: "",
    };

  function clearTimer() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    busy.current = false;
  }
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      void audio.current?.close();
    },
    [],
  );
  useEffect(() => {
    if (machineId) machineHeading.current?.focus();
    else if (round) chooseHeading.current?.focus();
  }, [machineId, round]);
  useEffect(() => {
    if (stage === "reveal") {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
        dialog.current?.close();
      };
    }
  }, [stage]);

  function choose(id: MachineId) {
    clearTimer();
    setStage("select");
    setMachineId(id);
    setSelectedId(machines.find((m) => m.id === id)!.products[0]?.id ?? "");
  }
  function switchMachines() {
    clearTimer();
    setStage("select");
    setMachineId(null);
    setRound((n) => n + 1);
  }
  function chime() {
    if (!sound) return;
    try {
      const ctx = audio.current ?? new AudioContext();
      audio.current = ctx;
      void ctx.resume();
      [523.25, 659.25, 783.99].forEach((hz, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = hz;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(
          0.035,
          ctx.currentTime + i * 0.09 + 0.015,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.09 + 0.3,
        );
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.32);
      });
    } catch {
      setSound(false);
    }
  }
  function dispense(replaying = false) {
    if (busy.current || (stage !== "select" && !replaying)) return;
    busy.current = true;
    setVendCount((n) => n + 1);
    setStage("dispensing");
    chime();
    timer.current = setTimeout(
      () => {
        setStage("ready");
        timer.current = setTimeout(
          () => {
            busy.current = false;
            setStage("reveal");
          },
          quiet ? 150 : 850,
        );
      },
      quiet ? 100 : 2200,
    );
  }
  function reset() {
    clearTimer();
    setStage("select");
    requestAnimationFrame(() => dispenseButton.current?.focus());
  }
  function replay() {
    clearTimer();
    dispense(true);
  }
  const status =
    stage === "dispensing"
      ? `Dispensing virtual ${selected.name}.`
      : stage === "ready"
        ? `${selected.name} has arrived in the collection area.`
        : stage === "reveal"
          ? `${selected.name} revealed. This is a simulation.`
          : `${machine.short}: ${selected.name} selected. Ready to dispense.`;

  return (
    <MotionConfig reducedMotion="user">
      <div className={`demo-page ${machineId ?? "choose"}`} data-still={quiet}>
        <a className="skip" href="#experience">
          Skip to experience
        </a>
        <header className="demo-header">
          <a className="wordmark" href="/" aria-label="Vector Vending home">
            vector<span>vending</span>
            <i />
          </a>
          <div className="demo-header-actions">
            <span className="simulation-badge">
              <i /> A VIRTUAL TASTE
            </span>
            <a className="text-link" href="/">
              <ArrowLeft size={15} /> Main site
            </a>
          </div>
        </header>
        <main id="experience">
          {!machineId ? (
            <section className="choose-scene" aria-labelledby="choose-title">
              <div className="choose-intro">
                <p className="eyebrow">LOCAL FAVOURITES. ONE HAPPY TAP.</p>
                <h1 id="choose-title" ref={chooseHeading} tabIndex={-1}>
                  A little joy.
                  <br />
                  <span>Yours to discover.</span>
                </h1>
                <p>
                  Two familiar names. A new way to play.
                  <br />
                  Choose a machine and make a little moment of your own.
                </p>
              </div>
              <div className="machine-choices">
                {machines.map((m) => (
                  <button
                    key={m.id}
                    className={`machine-choice ${m.id}`}
                    onClick={() => choose(m.id)}
                    aria-label={`Explore ${m.name} machine`}
                  >
                    <div className="choice-top">
                      <span className="eyebrow">THE {m.number} EDITION</span>
                      <Photo
                        file={m.logo}
                        alt={m.name}
                        className="choice-logo"
                        eager
                      />
                    </div>
                    <div className="choice-machine">
                      <div className="choice-halo" />
                      <Photo
                        file={m.photo}
                        alt={`Actual ${m.name} vending machine`}
                        eager
                      />
                    </div>
                    <div className="choice-bottom">
                      <div>
                        <h2>{m.short}</h2>
                        <p>{m.line}</p>
                      </div>
                      <span className="round-arrow">
                        <ArrowRight size={22} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="simulation-note">
                Interactive simulation · No payment or order · Selection varies
                by machine
              </p>
            </section>
          ) : (
            <section
              className="experience-scene"
              aria-labelledby="machine-title"
            >
              <div className="experience-toolbar">
                <button className="plain-button" onClick={switchMachines}>
                  <Shuffle size={16} /> Switch machines
                </button>
                <div className="experience-options">
                  <button
                    aria-pressed={still}
                    onClick={() => setStill((v) => !v)}
                  >
                    {still ? "Still mode on" : "Still mode"}
                  </button>
                  <button
                    aria-pressed={sound}
                    onClick={() => setSound((v) => !v)}
                    aria-label={sound ? "Turn sound off" : "Turn sound on"}
                  >
                    {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}{" "}
                    Sound {sound ? "on" : "off"}
                  </button>
                </div>
              </div>
              <div className="experience-grid">
                <div className="machine-theatre">
                  <div className="theatre-heading">
                    <p className="eyebrow">THE {machine.number} EDITION</p>
                    <Photo
                      file={machine.logo}
                      alt={machine.name}
                      className="theatre-logo"
                      eager
                    />
                  </div>
                  <div
                    className={`machine-object ${stage}`}
                    data-machine={machine.id}
                    aria-label={`${machine.name} simulated dispensing animation`}
                  >
                    <div className="theatre-glow" />
                    <Photo
                      file={machine.photo}
                      alt={`Photograph of the ${machine.name} machine. Stock in the photograph is historical.`}
                      className="real-machine"
                      eager
                    />
                    <div className="virtual-path" aria-hidden="true">
                      <div className="virtual-shelf" />
                      <AnimatePresence>
                        {stage !== "select" && (
                          <motion.div
                            key={`${selected.id}-${vendCount}`}
                            className="travelling-product"
                            initial={{ top: "8%", opacity: 0, scale: 0.75 }}
                            animate={
                              quiet
                                ? { top: "88%", opacity: 1, scale: 1 }
                                : {
                                    top: [
                                      "8%",
                                      "8%",
                                      "20%",
                                      "88%",
                                      "83%",
                                      "88%",
                                    ],
                                    opacity: [0, 1, 1, 1, 1, 1],
                                    rotate: [0, 0, -5, 8, -3, 0],
                                    scale: [0.75, 0.75, 0.8, 1, 1, 1],
                                  }
                            }
                            transition={{
                              duration: quiet ? 0 : 2.2,
                              times: quiet
                                ? undefined
                                : [0, 0.18, 0.4, 0.82, 0.92, 1],
                              ease: "easeInOut",
                            }}
                          >
                            <Photo file={selected.image} alt="" eager />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div
                      className={`tray-light ${stage === "ready" || stage === "reveal" ? "on" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="theatre-caption">
                    <span>REAL MACHINE. VIRTUAL MOMENT.</span>
                    <p>
                      Installation photograph with a simulated product
                      animation.
                      <br />
                      Photographed stock does not indicate current availability.
                    </p>
                  </div>
                </div>
                <div className="catalogue-panel">
                  <p className="eyebrow">CHOOSE · DISPENSE · DISCOVER</p>
                  <h1 id="machine-title" ref={machineHeading} tabIndex={-1}>
                    {machine.line}
                  </h1>
                  <p className="catalogue-intro">{machine.subtitle}</p>
                  <div className="catalogue-label">
                    <h2>The tasting selection</h2>
                    <span>CURATED DEMO</span>
                  </div>
                  <div
                    className="tasting-products"
                    aria-label={`${machine.name} demo products`}
                  >
                    {machine.products.length ? (
                      machine.products.map((p, i) => (
                        <button
                          key={p.id}
                          className={`tasting-product ${selected.id === p.id ? "selected" : ""}`}
                          aria-pressed={selected.id === p.id}
                          aria-label={`Select ${p.name}`}
                          disabled={stage !== "select"}
                          onClick={() => setSelectedId(p.id)}
                        >
                          <Photo
                            file={p.image}
                            alt=""
                            className="tasting-photo"
                            eager
                          />
                          <div>
                            <span className="product-index">
                              0{i + 1} / {machine.short}
                            </span>
                            <h3>{p.name}</h3>
                            <span className="selection-hint">
                              {selected.id === p.id
                                ? "Your little moment"
                                : "Tap to select"}
                            </span>
                          </div>
                          <span className="selection-check">
                            {selected.id === p.id ? (
                              <Check size={15} />
                            ) : (
                              <span />
                            )}
                          </span>
                        </button>
                      ))
                    ) : (
                      <p role="status">
                        The demo selection is being refreshed. Try the other
                        machine.
                      </p>
                    )}
                  </div>
                  <div className="dispense-area">
                    <div className="selection-summary">
                      <span>YOUR SELECTION</span>
                      <strong>{selected.name}</strong>
                    </div>
                    <button
                      ref={dispenseButton}
                      className="demo-primary"
                      disabled={stage !== "select" || !machine.products.length}
                      onClick={() => dispense()}
                    >
                      {stage === "select"
                        ? "Dispense"
                        : stage === "dispensing"
                          ? "A little magic…"
                          : "Here it comes…"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  <p
                    className="demo-status"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {status}
                  </p>
                  <p className="simulation-disclosure">
                    Just for discovery. This is a simulation, with no payment,
                    order or real dispense. Selection varies by machine.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
        <footer className="demo-footer">
          <span>A little closer to the things you love.</span>
          <a href="/#locations">
            Find a real machine <ArrowRight size={14} />
          </a>
        </footer>
        <dialog
          ref={dialog}
          className={`product-dialog ${machine.id}`}
          aria-labelledby="reveal-title"
          aria-describedby="reveal-description"
          onCancel={(e) => {
            e.preventDefault();
            reset();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) reset();
          }}
        >
          {stage === "reveal" && (
            <motion.div
              className="reveal-content"
              initial={{
                opacity: 0,
                scale: quiet ? 1 : 0.86,
                y: quiet ? 0 : 30,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: quiet ? 0 : 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <button
                autoFocus
                className="reveal-close"
                onClick={reset}
                aria-label="Close product reveal"
              >
                <X size={22} />
              </button>
              <div className="reveal-visual">
                <span className="reveal-orbit" />
                <Photo
                  file={selected.image}
                  alt={selected.name}
                  className="reveal-photo"
                  eager
                />
                <span className="reveal-visual-caption">
                  A LITTLE MOMENT, BEAUTIFULLY CHOSEN.
                </span>
              </div>
              <div className="reveal-copy">
                <Photo
                  file={machine.logo}
                  alt={machine.name}
                  className="reveal-logo"
                  eager
                />
                <p className="eyebrow">YOUR VIRTUAL TREAT HAS ARRIVED</p>
                <h2 id="reveal-title">
                  {selected.name}
                  <span>
                    A little joy,
                    <br />
                    revealed.
                  </span>
                </h2>
                <p id="reveal-description">{selected.description}</p>
                <a
                  className="source-link"
                  href={selected.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the official brand site <ArrowRight size={13} />
                </a>
                <div className="reveal-actions">
                  <button className="demo-primary" onClick={reset}>
                    Try another <ArrowRight size={17} />
                  </button>
                  <button className="plain-button" onClick={replay}>
                    <RotateCcw size={15} /> Replay selection
                  </button>
                  <button className="plain-button" onClick={switchMachines}>
                    <Shuffle size={15} /> Switch machines
                  </button>
                </div>
                <p className="simulation-disclosure">
                  A simulated treat, just for discovery. No order was placed.
                  <br />
                  Selection varies by machine.
                </p>
              </div>
            </motion.div>
          )}
        </dialog>
      </div>
    </MotionConfig>
  );
}
