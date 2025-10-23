import React from 'react';

export default function Loading() {
  return (
    <div className="loading">
      <div className="container-loading">
        <span style={{ '--index-i4': 1 } as React.CSSProperties}></span>
        <span style={{ '--index-i4': 2 } as React.CSSProperties}></span>
      </div>
    </div>
  );
}
