import React from 'react'
import './Skeleton.css';

export default function SkeletonElement({type}) {
  return (
    <div className={type || "squar"}>
        <div className="skeleton">

        </div>
    </div>
  )
}
