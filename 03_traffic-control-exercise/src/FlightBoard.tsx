import { Flight } from './types';
import styles from './FlightBoard.module.css';

interface FlightBoardProps {
  flights: Flight[];
}

export default function FlightBoard({ flights }: FlightBoardProps) {
  // Helper function to get status color class
  const getStatusClass = (status: Flight['status']) => {
    switch (status) {
      case 'scheduled':
        return styles.statusScheduled;
      case 'boarding':
        return styles.statusBoarding;
      case 'departed':
        return styles.statusDeparted;
      case 'landed':
        return styles.statusLanded;
      case 'delayed':
        return styles.statusDelayed;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.flightBoard}>
      <div className={styles.header}>
        <h2>Flight Information Board</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>Origin/Dest</th>
              <th>Type</th>
              <th>Scheduled</th>
              <th>Actual</th>
              <th>Status</th>
              <th>Gate</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td className={styles.flightNumber}>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>
                  {flight.type === 'arrival' ? flight.origin : flight.destination}
                </td>
                <td>
                  <span className={flight.type === 'arrival' ? styles.typeArrival : styles.typeDeparture}>
                    {flight.type === 'arrival' ? '↓ ARR' : '↑ DEP'}
                  </span>
                </td>
                <td>{flight.scheduledTime}</td>
                <td>{flight.actualTime || '-'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(flight.status)}`}>
                    {flight.status.toUpperCase()}
                  </span>
                </td>
                <td>{flight.gate || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
