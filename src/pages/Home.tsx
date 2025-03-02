import React from 'react';
import { DollarSign, ShoppingCart, Package, TrendingUp, Bell } from 'lucide-react';

const Home = () => {
  const stats = [
    {
      title: 'Total Profit',
      value: '$45,231',
      change: '+20.1%',
      isPositive: true,
      icon: DollarSign
    },
    {
      title: 'Total Orders',
      value: '1,205',
      change: '+12.5%',
      isPositive: true,
      icon: ShoppingCart
    },
    {
      title: 'Total Products',
      value: '356',
      change: '-2.3%',
      isPositive: false,
      icon: Package
    },
    {
      title: 'Total Revenue',
      value: '$89,123',
      change: '+15.2%',
      isPositive: true,
      icon: TrendingUp
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'New order received',
      description: 'Order #12345 needs processing',
      time: '5 minutes ago',
      type: 'order'
    },
    {
      id: 2,
      title: 'Low stock alert',
      description: 'Product "Gaming Mouse" is running low',
      time: '2 hours ago',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Payment received',
      description: 'Payment for order #12344 confirmed',
      time: '4 hours ago',
      type: 'success'
    }
  ];

  return (
    <div className="home-container">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">{stat.title}</div>
              <div className="stat-card-icon-container">
                <stat.icon className="stat-card-icon" />
              </div>
            </div>
            <div className="stat-card-content">
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-change">
                <span className={stat.isPositive ? 'stat-card-change-positive' : 'stat-card-change-negative'}>
                  {stat.change}
                </span>
                <span className="stat-card-period">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="notifications-container">
        <div className="card">
          <div className="card-header row">
            <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
            <h2 className="card-title">Recent Notifications</h2>
          </div>
          <div className="card-content spaced">
            {notifications.map((notification) => (
              <div key={notification.id} className="card secondary">
                <div className="card-content">
                  <div className="notification-header">
                    <h3 className="notification-title">{notification.title}</h3>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-description">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;