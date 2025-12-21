import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import Avatar from '../../components/Avatar';

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users and contests to calculate wins
  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const [usersRes, contestsRes] = await Promise.all([
          axiosSecure.get('/users'),
        axiosSecure.get('/contests')
      ]);

      const users = usersRes.data;
      const contests = contestsRes.data;

      // Calculate wins for each user (excluding admin users)
      const leaderboardData = users
        .filter(user => user.role !== 'admin') // Filter out admin users
        .map(user => {
          const wins = contests.filter(c => c.winnerId === user._id).length;
          return {
            ...user,
            wins,
            totalContests: contests.filter(c => c.participants?.includes(user._id)).length
          };
        })
        .filter(user => user.wins > 0) // Only show users with wins
        .sort((a, b) => b.wins - a.wins); // Sort by wins descending

      return leaderboardData;
    },
  });

  const getRankIcon = (index) => {
     if (index === 0) return <FaTrophy className="text-yellow-500 text-2xl" />;
    if (index === 1) return <FaMedal className="text-gray-400 text-2xl" />;
     if (index === 2) return <FaAward className="text-orange-500 text-2xl" />;
    return <span className="text-gray-500 font-bold text-lg">#{index + 1}</span>;
  };

  const getRankBadge = (index) => {
    if (index === 0) return 'badge-warning';
    if (index === 1) return 'badge-secondary';
    if (index === 2) return 'badge-accent';
    return 'badge-ghost';
  };

  if (isLoading) return <p className="p-4 text-center">Loading leaderboard...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-2 flex items-center justify-center gap-2">
          <FaTrophy /> Leaderboard
        </h1>
        <p className="text-gray-600">Top performers ranked by contest wins</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
             <FaTrophy className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No winners yet</p>
          <p className="text-gray-400 text-sm mt-2">Winners will appear here once contests are completed</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="table w-full">
            <thead className="bg-teal-50">
              <tr>
                <th>Rank</th>
                <th>User</th>
                  <th>Wins</th>
                <th>Participated</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => {
                const winRate = user.totalContests > 0 
                  ? ((user.wins / user.totalContests) * 100).toFixed(1) 
                   : 0;

                return (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center gap-2">
                        {getRankIcon(index)}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Avatar
                            name={user.name || user.displayName}
                              email={user.email}
                            photoURL={user.photoURL}
                            className="w-12 h-12"
                            ring
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{user.name || 'Anonymous'}</div>
                           <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getRankBadge(index)} text-lg px-3 py-2`}>
                        {user.wins} {user.wins === 1 ? 'Win' : 'Wins'}
                      </span>
                    </td>
                    <td className="text-gray-600">{user.totalContests}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                              className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${winRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{winRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Top 3 Highlight Cards */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {leaderboard.slice(0, 3).map((user, index) => (
            <div
              key={user._id}
              className={`card shadow-lg ${
                index === 0 ? 'bg-yellow-50 border-2 border-yellow-300' :
                index === 1 ? 'bg-gray-50 border-2 border-gray-300' :
                'bg-orange-50 border-2 border-orange-300'
              }`}
            >
              <div className="card-body text-center">
                <div className="flex justify-center mb-2">
                  {getRankIcon(index)}
                </div>
                <div className="avatar mx-auto mb-2">
                  <Avatar
                    name={user.name || user.displayName}
                    email={user.email}
                    photoURL={user.photoURL}
                    className="w-20 h-20"
                    ring
                  />
                </div>
                <h3 className="text-xl font-bold">{user.name || 'Anonymous'}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="stats stats-vertical shadow mt-4">
                  <div className="stat py-2">
                    <div className="stat-title">Wins</div>
                    <div className="stat-value text-2xl">{user.wins}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

