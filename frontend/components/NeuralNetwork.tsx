"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  pulseDelay: number;
}

export default function NeuralNetwork() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate neural network nodes
    const generateNodes = () => {
      const nodeCount = 60;
      const newNodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          connections: [],
          pulseDelay: Math.random() * 4,
        };

        // Create connections to nearby nodes
        for (let j = 0; j < i; j++) {
          const distance = Math.sqrt(
            Math.pow(node.x - newNodes[j].x, 2) +
              Math.pow(node.y - newNodes[j].y, 2)
          );
          if (distance < 20 && Math.random() > 0.6) {
            node.connections.push(j);
          }
        }

        newNodes.push(node);
      }

      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Glow filters */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="strongGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00aeef" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0891b2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#00aeef" stopOpacity="1" />
            <stop offset="50%" stopColor="#0891b2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.6" />
          </radialGradient>

          <radialGradient id="pulseGradient">
            <stop offset="0%" stopColor="#00aeef" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#0891b2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connections with animated glow */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => {
            const connectedNode = nodes[connectionId];
            if (!connectedNode) return null;

            return (
              <g key={`${node.id}-${connectionId}`}>
                <motion.line
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.15"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    strokeWidth: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 4,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })
        )}

        {/* Nodes with pulsing glow effect */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Pulsing outer glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="1.5"
              fill="url(#pulseGradient)"
              filter="url(#strongGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                delay: node.pulseDelay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Main node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="0.4"
              fill="url(#nodeGradient)"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                delay: node.pulseDelay + 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
