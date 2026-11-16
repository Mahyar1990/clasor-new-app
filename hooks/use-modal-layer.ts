"use client";
import { createContext, useContext } from "react";
export const ModalLayerContext = createContext(false);
export function useModalLayer() { return useContext(ModalLayerContext); }
