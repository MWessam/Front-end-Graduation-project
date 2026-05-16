import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminBreadcrumbs({ items }) {
  if (!items?.length) return null;
  return (
    <nav className="admin-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={item.to || item.label}>
          {i > 0 && <span className="sep" aria-hidden>/</span>}
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current={i === items.length - 1 ? 'page' : undefined}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
