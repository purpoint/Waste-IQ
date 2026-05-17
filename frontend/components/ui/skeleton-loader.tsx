export function SkeletonCard() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "20px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ width: "120px", height: "12px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", marginBottom: "12px" }} />
          <div style={{ width: "80px", height: "28px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", marginBottom: "8px" }} />
          <div style={{ width: "100px", height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }} />
        </div>
        <div style={{ width: "40px", height: "40px", background: "rgba(255,255,255,0.06)", borderRadius: "12px" }} />
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "20px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}>
      {/* Header */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <div style={{ width: "150px", height: "14px", background: "rgba(255,255,255,0.08)", borderRadius: "6px" }} />
      </div>
      {/* Rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ width: "120px", height: "12px", background: "rgba(255,255,255,0.08)", borderRadius: "6px" }} />
          <div style={{ width: "80px", height: "12px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }} />
          <div style={{ width: "60px", height: "12px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }} />
          <div style={{ width: "60px", height: "12px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }} />
          <div style={{ width: "80px", height: "20px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", marginLeft: "auto" }} />
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "20px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}>
      <div style={{ width: "150px", height: "14px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", marginBottom: "20px" }} />
      <div style={{ height: "220px", display: "flex", alignItems: "flex-end", gap: "8px" }}>
        {[60, 80, 45, 90, 55, 75, 65].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: "rgba(168,85,247,0.1)", borderRadius: "6px 6px 0 0" }} />
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6" style={{ position: "relative", zIndex: 1 }}>
      {/* Header skeleton */}
      <div style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
        <div style={{ width: "260px", height: "28px", background: "rgba(255,255,255,0.08)", borderRadius: "8px", marginBottom: "8px" }} />
        <div style={{ width: "200px", height: "14px", background: "rgba(255,255,255,0.05)", borderRadius: "6px" }} />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}