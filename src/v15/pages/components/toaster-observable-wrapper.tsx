"use client";

import ToasterObservable from "./toaster-observable";
import {Toaster} from "../../../ui/components/toaster";

export default function ToasterObservableWrapper() {
  return (
    <>
      <ToasterObservable />
      <Toaster />
    </>
  );
}
