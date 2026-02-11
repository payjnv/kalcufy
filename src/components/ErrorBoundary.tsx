"use client";
import { Component, ReactNode } from "react";

export class GlobalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: false };
  }

  componentDidCatch(error: Error) {
    if (error.message?.includes("removeChild") || error.message?.includes("insertBefore") || error.message?.includes("not a child")) {
      this.setState({ hasError: false });
      return;
    }
    console.error("App error:", error);
  }

  render() {
    return this.props.children;
  }
}
