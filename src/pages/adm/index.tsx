import { RideService } from '@/services/ride.service';
import { Ride } from '@/types/ride';
import { GetServerSideProps } from 'next';

export default function Index({ rides, error }: { rides: Ride[], error: string }) {
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, index) => (
            <tr key={index}>
              <td>{ride.customer}</td>
              <td>{ride.driverName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const ridesData = await RideService.getRides();
    return {
      props: {
        rides: ridesData.data,
      },
    };
  } catch (error) {
    return {
      props: {
        rides: [],
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};
