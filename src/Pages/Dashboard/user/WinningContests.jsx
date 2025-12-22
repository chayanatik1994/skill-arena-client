import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const WinningContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch contests using TanStack Query
  const { data: allContests = [], isLoading: loading } = useQuery({
    queryKey: ['contests', 'user-wins'],
    queryFn: async () => {
       const res = await axiosSecure.get('/contests');
      return res.data;
    },
    enabled: !!user?._id,
  });

  // Calculate participated and won contests
  const { participated, wonContests } = useMemo(() => {
    const participatedContests = allContests.filter(
      c => c.participants?.includes(user?._id)
    );
    const won = allContests.filter(c => c.winnerId === user?._id);
      return { participated: participatedContests, wonContests: won };
  }, [allContests, user?._id]);

  if (loading) return <p className="p-4">Loading contests...</p>;
  if (!participated.length) return <p className="p-4">You haven't participated in any contests yet.</p>;

  const data = [
    { name: 'Won', value: wonContests.length },
    { name: 'Lost/Participated', value: participated.length - wonContests.length },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Winning Contests</h2>
         <div className="flex flex-col lg:flex-row gap-8">
        {/* Contest Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {wonContests.map(c => (
            <div key={c._id} className="card bg-base-100 shadow-md p-4">
               <img src={c.image} alt={c.name} className="w-full h-48 object-cover mb-2" />
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="mb-1">{c.description.slice(0, 80)}...</p>
              <p className="font-bold text-green-600">Prize: ${c.prizeMoney}</p>
            </div>
          ))}
        </div>

        {/* Win Percentage Chart */}
        <div className="flex-1 flex justify-center items-center">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
                nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
             <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default WinningContests;
