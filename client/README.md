# Trading Agents - Frontend

A visual workflow builder for creating automated trading strategies using a node-based interface.

## Tech Stack

- **React 19** with TypeScript
- **React Flow** - Node-based workflow editor
- **Tailwind CSS** - Styling
- **Radix UI / shadcn/ui** - UI components
- **Vite** - Build tool

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── CreateWorkflow.tsx    # Main workflow canvas
│   ├── TriggerSheet.tsx      # Trigger configuration sheet
│   ├── ActionSheet.tsx       # Action configuration sheet
│   └── ui/                   # shadcn/ui components
├── nodes/
│   ├── triggers/
│   │   ├── Timer.tsx         # Time-based trigger
│   │   └── PriceTrigger.tsx  # Price threshold trigger
│   └── actions/
│       └── Lighter.tsx       # Trading action node
└── lib/
    └── utils.ts              # Utility functions
```

## Features

### Triggers
- **Timer** - Execute workflow at specified intervals (seconds)
- **Price Trigger** - Execute when asset price crosses threshold

### Actions
- **Hyperliquid** - Place trades on Hyperliquid
- **Lighter** - Place trades on Lighter
- **Backpack** - Place trades on Backpack

### Workflow Builder
1. Select a trigger type when the page loads
2. Configure trigger parameters (time interval or price/asset)
3. Drag from the trigger node to create action nodes
4. Configure action parameters (trade type, symbol, quantity)
