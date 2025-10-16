import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  totalFlights: number;
  activeFlights: number;
  availableRunways: number;
}

export default function ControlPanel({
  totalFlights,
  activeFlights,
  availableRunways
}: ControlPanelProps) {
  // Placeholder handlers - students will implement these with state later
  const handleRefresh = () => {
    console.log('Refresh clicked - implement with state management');
  };

  const handleFilterArrivals = () => {
    console.log('Filter arrivals - implement with state management');
  };

  const handleFilterDepartures = () => {
    console.log('Filter departures - implement with state management');
  };

  const handleClearFilter = () => {
    console.log('Clear filter - implement with state management');
  };

  const handleEmergency = () => {
    console.log('Emergency mode - implement with state management');
  };

  return (
    <div className={styles.controlPanel}>
      <div className={styles.header}>
        <h2>Control Panel</h2>
        <div className={styles.timestamp}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Statistics Section */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Flights</div>
          <div className={styles.statValue}>{totalFlights}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active</div>
          <div className={styles.statValue}>{activeFlights}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Available Runways</div>
          <div className={styles.statValue}>{availableRunways}</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Flight Filters</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleFilterArrivals}
          >
            📥 Arrivals Only
          </button>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleFilterDepartures}
          >
            📤 Departures Only
          </button>
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleClearFilter}
          >
            ✖ Clear Filter
          </button>
        </div>
      </div>

      {/* Action Controls */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Actions</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonSuccess}`}
            onClick={handleRefresh}
          >
            🔄 Refresh Data
          </button>
          <button
            className={`${styles.button} ${styles.buttonDanger}`}
            onClick={handleEmergency}
          >
            🚨 Emergency Mode
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>ℹ️</div>
        <div className={styles.infoText}>
          <strong>Note:</strong> All controls are currently placeholders.
          Implement state management to make them functional.
        </div>
      </div>
    </div>
  );
}
