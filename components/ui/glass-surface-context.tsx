"use client";
import { createContext, useContext } from "react";
export const GlassSurfaceContext = createContext(false);
export function useGlassSurface() { return useContext(GlassSurfaceContext); }
