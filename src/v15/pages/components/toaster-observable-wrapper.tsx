"use client";

import React from "react";
import ToasterObservable from "./toaster-observable";
import {Toaster} from "../../../ui/components/toaster";

export default function ToasterObservableWrapper() {
  return (
    <React.Suspense>
      <ToasterObservable />
      <Toaster />
    </React.Suspense>
  );
}
