import { RideService } from '@/services/ride.service';

export default async function Page() {
  const ridesResponse = await RideService.getRides();

  return (
    <div>
      <h1>Dashboard {ridesResponse.error}</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {ridesResponse.data?.map((ride, index) => (
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
