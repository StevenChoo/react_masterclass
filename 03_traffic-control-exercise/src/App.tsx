import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
import { mockFlights, mockRunways } from './types';
import styles from './App.module.css';

export default function App() {
  // Using mock data directly - no state management yet
  // Students will later add state to make the app interactive
  const flights = mockFlights;
  const runways = mockRunways;

  // Calculate statistics
  const totalFlights = flights.length;
  const activeFlights = flights.filter(
    f => f.status === 'boarding' || f.status === 'departed'
  ).length;
  const availableRunways = runways.filter(r => r.status === 'available').length;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>✈️</div>
          <div className={styles.title}>
            <h1>Airport Traffic Control System</h1>
            <p className={styles.subtitle}>Schiphol International Airport</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topSection}>
          <div className={styles.controlPanelWrapper}>
            <ControlPanel
              totalFlights={totalFlights}
              activeFlights={activeFlights}
              availableRunways={availableRunways}
            />
          </div>
          <div className={styles.runwayStatusWrapper}>
            <RunwayStatus runways={runways} flights={flights} />
          </div>
        </div>

        <div className={styles.flightBoardWrapper}>
          <FlightBoard flights={flights} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Traffic Control Exercise • React Masterclass 2024</p>
      </footer>
    </div>
  );
}
