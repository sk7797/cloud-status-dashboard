import React, { useState } from "react";
import servicesData from "./data/services.json";
import "./styles/app.css";

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-card-header">
        <h3>{service.name}</h3>
        <StatusBadge status={service.status} />
      </div>
      <p>Environment: {service.environment}</p>
      <p>Region: {service.region}</p>
      <p>Open Incidents: {service.incidents}</p>
      <p>Last Deployment: {service.lastDeployment}</p>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");

  const filtered = servicesData.filter((s) =>
    filter === "All" ? true : s.status === filter
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cloud Resource Status Dashboard</h1>
        <p>Quick view of service health across environments.</p>
      </header>

      <div className="filters">
        {["All", "Healthy", "Degraded", "Down"].map((f) => (
          <button
            key={f}
            className={filter === f ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="service-grid">
        {filtered.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}
