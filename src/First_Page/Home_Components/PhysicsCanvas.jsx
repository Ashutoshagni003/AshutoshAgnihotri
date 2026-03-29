import '/Users/ashutoshagnihotri/Coding/Portfolio/src/First_Page/Home_Components/Physics.css'

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const PhysicsCanvas = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      MouseConstraint,
      Mouse,
      Composite,
      Bodies,
      Body,
      Events
    } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 0;

    const width = 520;
    const height = 360;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio
      }
    });

    const wallOptions = {
      isStatic: true,
      render: { visible: false }
    };

    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + 10, width, 20, wallOptions),
      Bodies.rectangle(-10, height / 2, 20, height, wallOptions),
      Bodies.rectangle(width + 10, height / 2, 20, height, wallOptions),
      Bodies.rectangle(width / 2, -10, width, 20, wallOptions)
    ]);

    const premiumColors = [
      "#0b0843", // Requested deep radiant navy
      "#1a146b", // Slightly lighter radiant navy
      "#2c2494", // Mid radiant navy
      "#f9f6ee", // Theme background beige
      "#ffffff"  // Pure white for high contrast
    ];

    const balls = [];
    const centerX = width / 2;
    const centerY = height / 2;

    // Main hero balls (bigger sizes for emphasis)
    const heroBalls = [
      { label: "React", radius: 42 }, // Increased from 32
      { label: "JS", radius: 36 },   // Increased from 26
      { label: "CSS", radius: 34 }   // Increased from 24
    ];

    heroBalls.forEach((item, index) => {
      const ball = Bodies.circle(
        centerX - 80 + index * 90, // Adjusted spacing for larger balls
        centerY - 40 + index * 30,
        item.radius,
        {
          restitution: 0.96,
          frictionAir: 0.035,
          density: 0.00045,
          render: { visible: false }
        }
      );

      ball.tech = item.label;
      // Use the requested deep navy for hero balls
      ball.baseColor = premiumColors[0];
      ball.isDark = true;

      balls.push(ball);
    });

    // Small support balls (higher count as requested)
    for (let i = 0; i < 50; i++) {
      const radius = Math.random() * 14 + 10;

      const x = centerX + (Math.random() - 0.5) * 320;
      const y = centerY + (Math.random() - 0.5) * 180;

      const ball = Bodies.circle(x, y, radius, {
        restitution: 0.96,
        frictionAir: 0.035,
        density: 0.00045,
        render: { visible: false }
      });

      // Removed sectioning to fully mix the colors randomly across the container
      ball.baseColor = premiumColors[Math.floor(Math.random() * premiumColors.length)];
      
      // Determine if a color is dark or light to set text and shadow colors appropriately
      ball.isDark = (ball.baseColor === premiumColors[0] || ball.baseColor === premiumColors[1] || ball.baseColor === premiumColors[2]);

      if (radius > 20 && Math.random() > 0.6) { // Adjusted size condition for text
        const stack = ["Node", "Mongo", "Git", "Framer", "UI/UX"];
        ball.tech = stack[Math.floor(Math.random() * stack.length)];
      }

      balls.push(ball);
    }

    Composite.add(engine.world, balls);

    // Soft center attraction
    Events.on(engine, "beforeUpdate", () => {
      balls.forEach((ball) => {
        const dx = centerX - ball.position.x;
        const dy = centerY - ball.position.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 80) {
          Body.applyForce(ball, ball.position, {
            x: dx * 0.000003,
            y: dy * 0.000003
          });
        }
      });
    });

    // Interaction with mouse causing strong dispersion
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.12,
        render: { visible: false }
      }
    });

    Events.on(mouseConstraint, "mousemove", (event) => {
      const mousePosition = event.mouse.position;

      balls.forEach((ball) => {
        const dx = ball.position.x - mousePosition.x;
        const dy = ball.position.y - mousePosition.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          Body.applyForce(ball, ball.position, {
            x: (dx / distance) * 0.002,
            y: (dy / distance) * 0.002
          });
        }
      });
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom 3D rendering for the balls
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      balls.forEach((ball) => {
        const x = ball.position.x;
        const y = ball.position.y;
        const r = ball.circleRadius;

        // Shadow
        ctx.beginPath();
        ctx.arc(x + 4, y + 6, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(11, 8, 67, 0.15)"; // Shadow tinted with #0b0843
        ctx.fill();

        // Base gradient for radiant 3D effect
        const gradient = ctx.createRadialGradient(
          x - r * 0.3,
          y - r * 0.3,
          r * 0.1,
          x,
          y,
          r
        );

        if (ball.isDark) {
          // Radiant dark balls
          gradient.addColorStop(0, "#4a54e1"); // Bright rim light
          gradient.addColorStop(0.4, ball.baseColor); // Base color
          gradient.addColorStop(1, "#04031a"); // Deep shadow
        } else {
          // Radiant light balls
          gradient.addColorStop(0, "#ffffff"); // Pure white highlight
          gradient.addColorStop(0.6, ball.baseColor); // Base color
          gradient.addColorStop(1, "#d1d5db"); // Soft slate shadow
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Glossy reflection highlight (more pronounced and shaped)
        ctx.beginPath();
        ctx.ellipse(
          x - r * 0.3,
          y - r * 0.4,
          r * 0.4,
          r * 0.2,
          -Math.PI / 8,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = ball.isDark ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.9)";
        ctx.fill();
        
        // Secondary softer highlight for extra radiance
        ctx.beginPath();
        ctx.arc(
          x - r * 0.2,
          y - r * 0.2,
          r * 0.15,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = ball.isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)";
        ctx.fill();

        // Text rendering
        if (ball.tech) {
          ctx.fillStyle = ball.isDark ? "#ffffff" : "#0b0843"; // Contrast text
          ctx.font = `600 ${r * 0.45}px 'Inter', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Add subtle text shadow for dark text on light balls to pop more
          if (!ball.isDark) {
             ctx.shadowColor="rgba(255,255,255,0.8)";
             ctx.shadowBlur=2;
          } else {
             ctx.shadowColor="transparent";
          }
          ctx.fillText(ball.tech, x, y);
          ctx.shadowColor="transparent"; // reset
        }

        // Inner edge stroke for definition
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = ball.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(11, 8, 67, 0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });

    // Make the canvas responsive
    render.canvas.style.width = '100%';
    render.canvas.style.height = '100%';
    render.canvas.style.objectFit = 'contain';

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return (
    <div
        className="PhysicsDiv"
      ref={sceneRef}
      style={{
        width: "100%",
        maxWidth: "520px",
        height: "360px",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
};

export default PhysicsCanvas;
