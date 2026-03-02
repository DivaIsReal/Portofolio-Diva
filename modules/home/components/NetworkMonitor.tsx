"use client";

import { useEffect, useRef, useState } from "react";
import { TbActivityHeartbeat as NetworkIcon } from "react-icons/tb";

import SectionHeading from "@/common/components/elements/SectionHeading";

interface LogEntry {
  time: string;
  type: "INFO" | "OK" | "WARN";
  message: string;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface ConnectionStats {
  latency: number;
  packets: number;
  bandwidth: number;
}

const LOG_POOL: { type: "INFO" | "OK" | "WARN"; message: string }[] = [
  { type: "INFO", message: "Packet inspection active on eth0" },
  { type: "OK", message: "Firewall rules validated successfully" },
  { type: "INFO", message: "DNS query resolved: 8.8.8.8" },
  { type: "OK", message: "SSL handshake completed" },
  { type: "INFO", message: "New connection established: 192.168.1.105" },
  { type: "WARN", message: "Unusual traffic spike detected on port 443" },
  { type: "OK", message: "IDS signature database updated" },
  { type: "INFO", message: "VPN tunnel renegotiated successfully" },
  { type: "OK", message: "Bandwidth threshold within normal range" },
  { type: "WARN", message: "Port scan attempt blocked from 10.0.0.47" },
  { type: "INFO", message: "DHCP lease renewed for 192.168.1.202" },
  { type: "OK", message: "Certificate rotation completed" },
  { type: "INFO", message: "ARP table updated: 3 new entries" },
  { type: "WARN", message: "MTU mismatch detected on vlan20" },
  { type: "OK", message: "BGP session re-established with peer" },
];

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const nowTime = () => new Date().toTimeString().slice(0, 8);

const NetworkMonitor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inboundRef = useRef<number[]>(
    Array.from({ length: 60 }, () => rand(25, 80))
  );
  const outboundRef = useRef<number[]>(
    Array.from({ length: 60 }, () => rand(10, 55))
  );
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const logIndexRef = useRef<number>(5);

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: rand(30, 70),
    memory: rand(40, 75),
    disk: rand(20, 60),
    network: rand(15, 55),
  });

  const [stats, setStats] = useState<ConnectionStats>({
    latency: rand(12, 45),
    packets: rand(1200, 8000),
    bandwidth: rand(45, 150),
  });

  const [logs, setLogs] = useState<LogEntry[]>(() =>
    Array.from({ length: 5 }, (_, i) => {
      const entry = LOG_POOL[i];
      const t = new Date(Date.now() - (4 - i) * 3000);
      return {
        time: t.toTimeString().slice(0, 8),
        type: entry.type,
        message: entry.message,
      };
    })
  );

  const [liveDot, setLiveDot] = useState(true);

  // ── Canvas animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (ts - lastTickRef.current > 500) {
        inboundRef.current = [
          ...inboundRef.current.slice(1),
          rand(25, 85),
        ];
        outboundRef.current = [
          ...outboundRef.current.slice(1),
          rand(10, 60),
        ];
        lastTickRef.current = ts;
      }

      const w = canvas.width;
      const h = canvas.height;
      const len = inboundRef.current.length;
      const step = w / (len - 1);

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "#1e1e1e";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const drawLine = (
        data: number[],
        strokeColor: string,
        fillRgba: string
      ) => {
        const pts = data.map((v, i) => ({
          x: i * step,
          y: h - (v / 100) * h * 0.88 - h * 0.06,
        }));

        // Filled area
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, fillRgba);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const mx = (pts[i - 1].x + pts[i].x) / 2;
          const my = (pts[i - 1].y + pts[i].y) / 2;
          ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, mx, my);
        }
        ctx.lineTo(pts[pts.length - 1].x, h);
        ctx.lineTo(pts[0].x, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const mx = (pts[i - 1].x + pts[i].x) / 2;
          const my = (pts[i - 1].y + pts[i].y) / 2;
          ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, mx, my);
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawLine(outboundRef.current, "#60a5fa", "rgba(96,165,250,0.15)");
      drawLine(inboundRef.current, "#eab308", "rgba(234,179,8,0.18)");

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Metrics + stats interval (2s) ─────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics({
        cpu: rand(20, 82),
        memory: rand(35, 78),
        disk: rand(15, 65),
        network: rand(10, 60),
      });
      setStats({
        latency: rand(12, 45),
        packets: rand(1200, 8000),
        bandwidth: rand(45, 150),
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // ── Log interval (3s) ─────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      const entry = LOG_POOL[logIndexRef.current % LOG_POOL.length];
      setLogs((prev) => [
        ...prev.slice(-7),
        { time: nowTime(), type: entry.type, message: entry.message },
      ]);
      logIndexRef.current += 1;
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // ── Live dot blink (1s) ───────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setLiveDot((v) => !v), 900);
    return () => clearInterval(id);
  }, []);

  // ── Data ──────────────────────────────────────────────────────────────────
  const metricBars = [
    { label: "CPU Usage", value: metrics.cpu, color: "bg-yellow-500" },
    { label: "Memory", value: metrics.memory, color: "bg-blue-400" },
    { label: "Disk I/O", value: metrics.disk, color: "bg-green-400" },
    { label: "Network", value: metrics.network, color: "bg-purple-400" },
  ];

  const threatItems = [
    { icon: "🛡️", label: "Firewall", status: "ACTIVE" },
    { icon: "🔍", label: "IDS/IPS", status: "MONITORING" },
    { icon: "🔒", label: "VPN Tunnel", status: "ENCRYPTED" },
    { icon: "⚠️", label: "Port Scan", status: "NONE" },
  ];

  const statCards = [
    { label: "Latency", value: String(stats.latency), unit: "ms" },
    { label: "Uptime", value: "99.9", unit: "%" },
    { label: "Packets/s", value: stats.packets.toLocaleString(), unit: "" },
    { label: "Bandwidth", value: String(stats.bandwidth), unit: "Mb" },
  ];

  const logColor: Record<string, string> = {
    INFO: "text-blue-400",
    OK: "text-green-400",
    WARN: "text-yellow-400",
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
          // system
        </p>
        <SectionHeading title="Network Monitor" icon={<NetworkIcon />} />
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span
            className={`h-2 w-2 rounded-full bg-green-500 transition-opacity duration-300 ${
              liveDot ? "opacity-100" : "opacity-20"
            }`}
          />
          <span>
            Live monitoring —{" "}
            <span className="text-neutral-500 dark:text-neutral-500">
              simulated for display purposes
            </span>
          </span>
        </div>
      </div>

      {/* Widget grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

        {/* ── 1. Network Traffic Chart ─────────────────────────────────────── */}
        <div className="col-span-1 overflow-hidden rounded-lg border border-[#1e1e1e] bg-[#161616] md:col-span-2">
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
              network_traffic
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#666]">
                <span className="h-1.5 w-3 rounded-sm bg-yellow-500" />
                inbound
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#666]">
                <span className="h-1.5 w-3 rounded-sm bg-blue-400" />
                outbound
              </span>
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 font-mono text-[10px] text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                ACTIVE
              </span>
            </div>
          </div>
          <canvas ref={canvasRef} className="h-[110px] w-full" />
        </div>

        {/* ── 2. System Status ─────────────────────────────────────────────── */}
        <div className="rounded-lg border border-[#1e1e1e] bg-[#161616] p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
              system_status
            </span>
            <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 font-mono text-[10px] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              SECURE
            </span>
          </div>
          <div className="space-y-3">
            {metricBars.map((bar) => (
              <div key={bar.label} className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-[#666]">
                    {bar.label}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    {bar.value}%
                  </span>
                </div>
                <div className="h-[3px] overflow-hidden rounded-full bg-[#1e1e1e]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${bar.color}`}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Threat Monitor ────────────────────────────────────────────── */}
        <div className="rounded-lg border border-[#1e1e1e] bg-[#161616] p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
              threat_monitor
            </span>
            <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 font-mono text-[10px] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              ALL CLEAR
            </span>
          </div>
          <div className="space-y-2">
            {threatItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded border border-[#1e1e1e] bg-[#0f0f0f] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-none">{item.icon}</span>
                  <span className="font-mono text-[11px] text-neutral-400">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-green-400">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Connection Stats ──────────────────────────────────────────── */}
        <div className="col-span-1 rounded-lg border border-[#1e1e1e] bg-[#161616] p-4 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
              connection_stats
            </span>
            <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              STABLE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {statCards.map((s) => (
              <div
                key={s.label}
                className="rounded border border-[#1e1e1e] bg-[#0f0f0f] p-3 text-center"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
                  {s.label}
                </div>
                <div className="mt-1.5 font-mono text-xl font-bold text-yellow-500 transition-all duration-500">
                  {s.value}
                  {s.unit && (
                    <span className="ml-0.5 text-xs text-[#555]">{s.unit}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Connection Log ────────────────────────────────────────────── */}
        <div className="col-span-1 overflow-hidden rounded-lg border border-[#1e1e1e] bg-[#161616] p-4 md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
              connection_log
            </span>
            <span className="font-mono text-[10px] text-[#444]">
              live feed
            </span>
          </div>
          <div className="relative space-y-1">
            {logs.map((log, i) => (
              <div
                key={i}
                className="flex gap-2 font-mono text-[11px] leading-relaxed"
              >
                <span className="shrink-0 text-[#3a3a3a]">[{log.time}]</span>
                <span
                  className={`w-[44px] shrink-0 font-semibold ${logColor[log.type]}`}
                >
                  [{log.type}]
                </span>
                <span className="text-neutral-500">{log.message}</span>
              </div>
            ))}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-[#161616] to-transparent" />
          </div>
        </div>

        {/* Watermark */}
        <div className="col-span-1 text-right md:col-span-2">
          <span className="font-mono text-[9px] text-[#2a2a2a]">
            // simulated for display purposes
          </span>
        </div>
      </div>
    </section>
  );
};

export default NetworkMonitor;
