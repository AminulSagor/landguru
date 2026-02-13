"use client";
import React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return <p className="text-sm font-semibold text-gray">{title}</p>;
}
