import React from "react";

export function card({ children, className }) {
  return <div className={`rounded-xl shadow-md bg-white ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}


export function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
}

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

export default function Card({ children }) {
  return <div className="card">{children}</div>;
}


export function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

