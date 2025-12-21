import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUsers, FaTrophy, FaDollarSign, FaChartLine, FaAward, FaCalendarCheck } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const [usersRes, contestsRes] = await Promise.all([
        axiosSecure.get('/users'),
        axiosSecure.get('/contests')
      ]);

      const users = usersRes.data;
      const contests = contestsRes.data;
      // Calculate statistics
      const totalUsers = users.length;
        const totalCreators = users.filter(u => u.role === 'creator').length;
      const totalAdmins = users.filter(u => u.role === 'admin').length;
      const totalContests = contests.length;
        const approvedContests = contests.filter(c => c.status === 'approved').length;
      const pendingContests = contests.filter(c => c.status === 'pending').length;
      const totalParticipants = contests.reduce((sum, c) => sum + (c.participants?.length || 0), 0);
        const totalWinners = contests.filter(c => c.winnerId).length;
      const totalPrizeMoney = contests.reduce((sum, c) => sum + (c.prizeMoney || 0), 0);
      const totalRevenue = contests.reduce((sum, c) => sum + ((c.price || 0) * (c.participants?.length || 0)), 0);

      // Contest type distribution
      const typeDistribution = contests.reduce((acc, c) => {
        const type = c.type || 'Other';
          acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      // Monthly contest creation
      const monthlyData = contests.reduce((acc, c) => {
        if (c.createdAt) {
            const month = new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        totalUsers,
        totalCreators,
        totalAdmins,
        totalContests,
          approvedContests,
        pendingContests,
        totalParticipants,
        totalWinners,
        totalPrizeMoney,
        totalRevenue,
        typeDistribution,
        monthlyData
      };
    },
  });

  if (isLoading) return <p className="p-4 text-center">Loading statistics...</p>;

  const chartData = Object.entries(stats?.typeDistribution || {}).map(([type, count]) => ({
    name: type,
    count
  }));

  const monthlyChartData = Object.entries(stats?.monthlyData || {}).map(([month, count]) => ({
    month,
    contests: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-600 mb-8 text-center">Platform Statistics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
              <div className="flex items-center gap-4">
              <FaUsers className="text-4xl text-blue-500" />
              <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
              </div>
            </div>
              <div className="text-xs text-gray-500 mt-2">
              {stats?.totalCreators || 0} Creators • {stats?.totalAdmins || 0} Admins
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
                   <FaTrophy className="text-4xl text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Total Contests</p>
                <p className="text-2xl font-bold">{stats?.totalContests || 0}</p>
                </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {stats?.approvedContests || 0} Approved • {stats?.pendingContests || 0} Pending
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <FaUsers className="text-4xl text-green-500" />
              <div>
                  <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold">{stats?.totalParticipants || 0}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
                 {stats?.totalWinners || 0} Winners Declared
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <FaDollarSign className="text-4xl text-green-600" />
              <div>
                   <p className="text-sm text-gray-600">Total Prize Money</p>
                <p className="text-2xl font-bold">${stats?.totalPrizeMoney?.toLocaleString() || 0}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ${stats?.totalRevenue?.toLocaleString() || 0} Revenue
                </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contest Type Distribution */}
        <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaChartLine /> Contest Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                  outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
                <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Contest Creation */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaCalendarCheck /> Monthly Contest Creation
            </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
                <Tooltip />
              <Legend />
              <Bar dataKey="contests" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
              <FaAward className="text-3xl text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold">
                {stats?.totalParticipants > 0
                  ? ((stats.totalWinners / stats.totalParticipants) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-3xl text-indigo-500" />
              <div>
              <p className="text-sm text-gray-600">Average Prize</p>
              <p className="text-2xl font-bold">
                ${stats?.totalContests > 0
                  ? (stats.totalPrizeMoney / stats.totalContests).toFixed(0)
                  : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaUsers className="text-3xl text-teal-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Participants/Contest</p>
              <p className="text-2xl font-bold">
                {stats?.totalContests > 0
                  ? (stats.totalParticipants / stats.totalContests).toFixed(1)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

