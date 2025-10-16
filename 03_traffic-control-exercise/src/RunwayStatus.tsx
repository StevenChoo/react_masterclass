import { Runway, Flight } from './types';
import styles from './RunwayStatus.module.css';

interface RunwayStatusProps {
  runways: Runway[];
  flights: Flight[];
}

export default function RunwayStatus({ runways, flights }: RunwayStatusProps) {
  // Helper function to get runway status color class
  const getStatusClass = (status: Runway['status']) => {
    switch (status) {
      case 'available':
        return styles.statusAvailable;
      case 'occupied':
        return styles.statusOccupied;
      case 'maintenance':
        return styles.statusMaintenance;
      default:
        return '';
    }
  };

  // Helper function to find flight details
  const getFlightInfo = (flightId?: string) => {
    if (!flightId) return null;
    return flights.find(f => f.id === flightId);
  };

  return (
    <div className={styles.runwayStatus}>
      <div className={styles.header}>
        <h2>Runway Status</h2>
      </div>

      <div className={styles.runwaysGrid}>
        {runways.map((runway) => {
          const currentFlight = getFlightInfo(runway.currentFlight);

          return (
            <div
              key={runway.id}
              className={`${styles.runwayCard} ${getStatusClass(runway.status)}`}
            >
              <div className={styles.runwayHeader}>
                <div className={styles.runwayName}>{runway.name}</div>
                <div className={styles.statusIndicator}>
                  {runway.status === 'available' && '🟢'}
                  {runway.status === 'occupied' && '🔴'}
                  {runway.status === 'maintenance' && '🟡'}
                </div>
              </div>

              <div className={styles.statusLabel}>
                {runway.status.toUpperCase()}
              </div>

              {currentFlight && (
                <div className={styles.flightInfo}>
                  <div className={styles.flightNumber}>{currentFlight.flightNumber}</div>
                  <div className={styles.flightDetails}>
                    {currentFlight.airline} • {currentFlight.destination}
                  </div>
                </div>
              )}

              {!currentFlight && runway.status === 'available' && (
                <div className={styles.emptyState}>
                  Ready for operations
                </div>
              )}

              {!currentFlight && runway.status === 'maintenance' && (
                <div className={styles.emptyState}>
                  Undergoing maintenance
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
