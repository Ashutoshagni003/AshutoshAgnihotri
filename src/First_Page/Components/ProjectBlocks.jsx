// // import React, { useEffect, useRef, useState } from "react";
// // import Matter from "matter-js";

// // const ProjectBlocks = () => {
// //   const sceneRef = useRef(null);
// //   const engineRef = useRef(null);
// //   const [hasDropped, setHasDropped] = useState(false);

// //   useEffect(() => {
// //     // We create the observer to drop blocks ONLY when the user scrolls the jar into view
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting && !hasDropped && engineRef.current) {
// //           dropBlocks();
// //           setHasDropped(true);
// //         }
// //       },
// //       { threshold: 0.2 } // Trigger when 20% of the jar is visible
// //     );

// //     if (sceneRef.current) {
// //       observer.observe(sceneRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, [hasDropped]);

// //   useEffect(() => {
// //     const {
// //       Engine,
// //       Render,
// //       Runner,
// //       MouseConstraint,
// //       Mouse,
// //       Composite,
// //       Bodies,
// //       Events,
// //     } = Matter;

// //     const engine = Engine.create();
// //     engineRef.current = engine;
    
// //     // We need normal gravity for them to drop into the jar
// //     engine.world.gravity.y = 1;

// //     // Get parent dimensions dynamically
// //     const containerState = sceneRef.current.parentElement;
// //     const width = containerState.clientWidth;
// //     const height = containerState.clientHeight;

// //     const render = Render.create({
// //       element: sceneRef.current,
// //       engine,
// //       options: {
// //         width,
// //         height,
// //         wireframes: false,
// //         background: "transparent",
// //         pixelRatio: window.devicePixelRatio,
// //       },
// //     });

// //     // The Jar Walls (Left, Right, Bottom)
// //     const wallOptions = {
// //       isStatic: true,
// //       render: { visible: false },
// //       friction: 0.1,
// //       restitution: 0.2 // Slightly bouncy walls
// //     };

// //     const wallThickness = 60;
    
// //     Composite.add(engine.world, [
// //       // Bottom floor
// //       Bodies.rectangle(width / 2, height + wallThickness/2, width, wallThickness, wallOptions),
// //       // Left wall
// //       Bodies.rectangle(0 - wallThickness/2, height / 2, wallThickness, height * 2, wallOptions),
// //       // Right wall
// //       Bodies.rectangle(width + wallThickness/2, height / 2, wallThickness, height * 2, wallOptions),
// //     ]);

// //     // Setup local mouse scatter without blocking native DOM clicks
// //     const handleMouseMove = (e) => {
// //       const containerState = sceneRef.current.parentElement;
// //       if (!containerState) return;
// //       const rect = containerState.getBoundingClientRect();
// //       const mouseX = e.clientX - rect.left;
// //       const mouseY = e.clientY - rect.top;

// //       const bodies = Composite.allBodies(engine.world).filter(b => !b.isStatic);
// //       bodies.forEach(body => {
// //         const dx = body.position.x - mouseX;
// //         const dy = body.position.y - mouseY;
// //         const dist = Math.hypot(dx, dy);
        
// //         if (dist < 120) { // Hover radius
// //           // Calculate scatter force away from cursor
// //           const force = 0.0004 * (150 - dist); 
// //           Matter.Body.applyForce(body, body.position, {
// //             x: (dx / dist) * force,
// //             y: (dy / dist) * force - 0.005 // Add slight upward bump
// //           });
// //         }
// //       });
// //     };

// //     window.addEventListener('mousemove', handleMouseMove);

// //     // Custom rendering to make blocks look like premium white rounded solids with text
// //     Events.on(render, "afterRender", () => {
// //       const ctx = render.context;
// //       const bodies = Composite.allBodies(engine.world).filter(b => !b.isStatic);

// //       bodies.forEach((body) => {
// //         // Draw the white block path
// //         ctx.beginPath();
// //         body.vertices.forEach((v, i) => {
// //           if (i === 0) ctx.moveTo(v.x, v.y);
// //           else ctx.lineTo(v.x, v.y);
// //         });
// //         ctx.closePath();

// //         // Shadow behind block
// //         ctx.save();
// //         ctx.shadowColor = "rgba(99, 102, 241, 0.35)";
// //         ctx.shadowBlur = 26;
// //         ctx.shadowOffsetX = 0;
// //         ctx.shadowOffsetY = 8;
        
// //         ctx.fillStyle = "linear-gradient(180deg,rgba(2, 0, 36, 1) 0%, rgba(14, 14, 128, 1) 94%)";
// // ;
// //         ctx.fill();
// //         ctx.restore();

// //         // Subtle 3D border around block for definition
// //         ctx.lineWidth = 1;
// //         ctx.strokeStyle = "rgba(255,255,255,0.12)";
// //         ctx.stroke();

// //         // Draw skill text properly rotated inside the block
// //         if (body.skillText) {
// //           ctx.save();
// //           ctx.translate(body.position.x, body.position.y);
// //           ctx.rotate(body.angle);
          
// //           ctx.fillStyle = "#16191d"; // Navy text
// //           // Adjust font size dynamically based on block height
// //           ctx.font = `600 Math.max(14, body.rectHeight * 0.25)px 'Inter', sans-serif`;
// //           ctx.textAlign = "center";
// //           ctx.textBaseline = "middle";
// //           // Add subtle text shadow to pop against white
// //           ctx.shadowColor = "rgba(255,255,255,0.8)";
// //           ctx.shadowBlur = 2;
// //           ctx.fillText(body.skillText, 0, 0);
          
// //           ctx.restore();
// //         }
// //       });
// //     });

// //     Render.run(render);
// //     const runner = Runner.create();
// //     Runner.run(runner, engine);

// //     // Handle Resize
// //     const handleResize = () => {
// //       if (!sceneRef.current || !sceneRef.current.parentElement) return;
// //       const newWidth = sceneRef.current.parentElement.clientWidth;
// //       const newHeight = sceneRef.current.parentElement.clientHeight;
      
// //       render.canvas.width = newWidth;
// //       render.canvas.height = newHeight;
// //       render.options.width = newWidth;
// //       render.options.height = newHeight;
      
// //       // We don't update walls drastically on resize for simplicity, 
// //       // but in a perfect world you'd reposition the static bodies.
// //     };
    
// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //       window.removeEventListener("mousemove", handleMouseMove);
// //       Render.stop(render);
// //       Runner.stop(runner);
// //       Engine.clear(engine);
// //       if (render.canvas) render.canvas.remove();
// //     };
// //   }, []);

// //   const dropBlocks = () => {
// //     if (!engineRef.current || !sceneRef.current) return;
    
// //     const { Bodies, Composite } = Matter;
// //     const width = sceneRef.current.parentElement.clientWidth;
    
// //     const blocks = [];
    
// //     const skills = [
// //       "React", "Node.js", "MongoDB", "Express", 
// //        "UI/UX", "Bootstrap", "JS (ES6)", 
// //       "Git & GitHub",  "Redux", "Docker", 
// //       "REST API", "Vite", "AWS", "Python", "SQL","React", "Node.js", "MongoDB", "Express", 
// //        "UI/UX", "Bootstrap", "JS (ES6)", 
// //       "Git & GitHub",  "Redux", "Docker", 
// //       "REST API", "Vite", "AWS", "Python", "SQL"
// //     ];
    
// //     const blockCount = skills.length; 

// //     for (let i = 0; i < blockCount; i++) {
// //         // We make the blocks appropriately sized for the text inside
// //         const w = Math.random() * 40 + 90; // 90-130 wide
// //         const h = Math.random() * 20 + 50; // 50-70 high
        
// //         // Initial drop position (spread securely within width)
// //         const x = Math.random() * (width - 160) + 80; 
// //         const y = -100 - (Math.random() * 500); // stagger drops heavily
        
// //         const block = Bodies.rectangle(x, y, w, h, {
// //             restitution: 0.5, // Bouncy
// //             friction: 0.1,    // Slidable
// //             density: 0.002,
// //             chamfer: { radius: 12 }, // Extremely smooth rounded corners
// //             render: { visible: false } // We render manually for shadows
// //         });
        
// //         // Attach skill details
// //         block.skillText = skills[i];
// //         block.rectHeight = h;
        
// //         // Add random rotation tumbling downwards
// //         Matter.Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.2);
        
// //         blocks.push(block);
// //     }
    
// //     Composite.add(engineRef.current.world, blocks);
// //   };

// //   return (
// //     <div
// //       ref={sceneRef}
// //       style={{
// //         position: 'absolute',
// //         top: 0,
// //         left: 0,
// //         width: '100%',
// //         height: '100%',
// //         zIndex: 50, // Float in front of the cards!
// //         pointerEvents: 'none', // Allow clicks to pass through to the project cards underneath
// //         overflow: 'hidden'
// //       }}
// //     />
// //   );
// // };

// // export default ProjectBlocks;

// import React, { useEffect, useRef, useState } from "react";
// import Matter from "matter-js";

// const ProjectBlocks = () => {
//   const sceneRef = useRef(null);
//   const engineRef = useRef(null);
//   const [hasDropped, setHasDropped] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasDropped && engineRef.current) {
//           dropBlocks();
//           setHasDropped(true);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (sceneRef.current) observer.observe(sceneRef.current);

//     return () => observer.disconnect();
//   }, [hasDropped]);

//   useEffect(() => {
//     const {
//       Engine,
//       Render,
//       Runner,
//       Composite,
//       Bodies,
//       Events,
//       Body,
//     } = Matter;

//     const engine = Engine.create();
//     engineRef.current = engine;
//     engine.world.gravity.y = 1;

//     const container = sceneRef.current.parentElement;
//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     const render = Render.create({
//       element: sceneRef.current,
//       engine,
//       options: {
//         width,
//         height,
//         wireframes: false,
//         background: "transparent",
//         pixelRatio: window.devicePixelRatio,
//       },
//     });

//     const wallOptions = {
//       isStatic: true,
//       render: { visible: false },
//     };

//     const wallThickness = 60;

//     Composite.add(engine.world, [
//       Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions),
//       Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions),
//       Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions),
//     ]);

//     // Mouse interaction
//     const handleMouseMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       const mouseX = e.clientX - rect.left;
//       const mouseY = e.clientY - rect.top;

//       const bodies = Composite.allBodies(engine.world).filter((b) => !b.isStatic);

//       bodies.forEach((body) => {
//         const dx = body.position.x - mouseX;
//         const dy = body.position.y - mouseY;
//         const dist = Math.hypot(dx, dy);

//         if (dist < 150) {
//           const force = 0.0007 * (150 - dist);

//           Body.applyForce(body, body.position, {
//             x: (dx / dist) * force,
//             y: (dy / dist) * force - 0.006,
//           });
//         }
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     // Premium render
//     Events.on(render, "afterRender", () => {
//       const ctx = render.context;
//       const bodies = Composite.allBodies(engine.world).filter((b) => !b.isStatic);

//       bodies.forEach((body) => {
//         ctx.save();

//         ctx.beginPath();
//         body.vertices.forEach((v, i) => {
//           if (i === 0) ctx.moveTo(v.x, v.y);
//           else ctx.lineTo(v.x, v.y);
//         });
//         ctx.closePath();

//         // Shadow
//         ctx.shadowColor = "rgba(0, 183, 255, 0.35)";
//         ctx.shadowBlur = 25;
//         ctx.shadowOffsetX = 0;
//         ctx.shadowOffsetY = 8;

//         // Gradient fill
//         const gradient = ctx.createLinearGradient(
//           body.position.x - 70,
//           body.position.y - 35,
//           body.position.x + 70,
//           body.position.y + 35
//         );

//         gradient.addColorStop(0, "rgba(255,255,255,0.18)");
//         gradient.addColorStop(1, "rgba(173,216,230,0.28)");

//         ctx.fillStyle = gradient;
//         ctx.fill();

//         ctx.restore();

//         // Border
//         ctx.lineWidth = 1;
//         ctx.strokeStyle = "rgba(255,255,255,0.22)";
//         ctx.stroke();

//         // Highlight line
//         ctx.beginPath();
//         ctx.moveTo(body.vertices[0].x + 8, body.vertices[0].y + 4);
//         ctx.lineTo(body.vertices[1].x - 8, body.vertices[1].y + 4);
//         ctx.strokeStyle = "rgba(255,255,255,0.3)";
//         ctx.lineWidth = 1;
//         ctx.stroke();

//         // Text
//         if (body.skillText) {
//           ctx.save();
//           ctx.translate(body.position.x, body.position.y);
//           ctx.rotate(body.angle);

//           ctx.fillStyle = "#ffffff";
//           ctx.font = "600 15px Inter";
//           ctx.textAlign = "center";
//           ctx.textBaseline = "middle";

//           ctx.fillText(body.skillText, 0, 0);

//           ctx.restore();
//         }
//       });
//     });

//     Render.run(render);
//     const runner = Runner.create();
//     Runner.run(runner, engine);

//     const handleResize = () => {
//       const newWidth = container.clientWidth;
//       const newHeight = container.clientHeight;

//       render.canvas.width = newWidth;
//       render.canvas.height = newHeight;
//       render.options.width = newWidth;
//       render.options.height = newHeight;
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       Render.stop(render);
//       Runner.stop(runner);
//       Engine.clear(engine);
//       if (render.canvas) render.canvas.remove();
//     };
//   }, []);

//   const dropBlocks = () => {
//     if (!engineRef.current || !sceneRef.current) return;

//     const { Bodies, Composite, Body } = Matter;
//     const width = sceneRef.current.parentElement.clientWidth;

//     const skills = [
//       "React",
//       "Node.js",
//       "MongoDB",
//       "Express",
//       "UI/UX",
//       "Bootstrap",
//       "JavaScript",
//       "Git & GitHub",
//       "Redux",
//       "Docker",
//       "REST API",
//       "Vite",
//       "AWS",
//       "Python",
//       "SQL",
//     ];

//     const blocks = [];

//     skills.forEach((skill) => {
//       const w = Math.random() * 50 + 110;
//       const h = Math.random() * 15 + 55;

//       const x = Math.random() * (width - 160) + 80;
//       const y = -100 - Math.random() * 500;

//       const block = Bodies.rectangle(x, y, w, h, {
//         restitution: 0.5,
//         friction: 0.1,
//         density: 0.002,
//         chamfer: { radius: 14 },
//         render: { visible: false },
//       });

//       block.skillText = skill;
//       Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.2);

//       blocks.push(block);
//     });

//     Composite.add(engineRef.current.world, blocks);
//   };

//   return (
//     <div
//       ref={sceneRef}
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: 50,
//         pointerEvents: "none",
//         overflow: "hidden",
//       }}
//     />
//   );
// };

// export default ProjectBlocks;
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const ProjectBlocks = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasDropped && engineRef.current) {
          dropBlocks();
          setHasDropped(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sceneRef.current) observer.observe(sceneRef.current);

    return () => observer.disconnect();
  }, [hasDropped]);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      Composite,
      Bodies,
      Events,
      Body,
    } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = 1;

    const container = sceneRef.current.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const wallThickness = 60;

    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions),
    ]);

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const bodies = Composite.allBodies(engine.world).filter((b) => !b.isStatic);

      bodies.forEach((body) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < 150) {
          const force = 0.0007 * (150 - dist);

          Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force - 0.006,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Premium render
Events.on(render, "afterRender", () => {
  const ctx = render.context;
  const bodies = Composite.allBodies(engine.world).filter((b) => !b.isStatic);

  bodies.forEach((body) => {
    ctx.save();

    ctx.beginPath();
    body.vertices.forEach((v, i) => {
      if (i === 0) ctx.moveTo(v.x, v.y);
      else ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();

    // Premium shadow
    ctx.shadowColor = "rgba(5, 0, 88, 0.25)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;

    // Gradient fill
    const gradient = ctx.createLinearGradient(
      body.position.x,
      body.position.y - 40,
      body.position.x,
      body.position.y + 40
    );

    gradient.addColorStop(0, "#0b074e");
    gradient.addColorStop(1, "#1a1ab0");

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();

    // Border
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.stroke();

    // Top highlight
    ctx.beginPath();
    ctx.moveTo(body.vertices[0].x + 8, body.vertices[0].y + 4);
    ctx.lineTo(body.vertices[1].x - 8, body.vertices[1].y + 4);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text
    if (body.skillText) {
      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);

      ctx.fillStyle = "#ffffff";
      ctx.font = "600 15px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(body.skillText, 0, 0);

      ctx.restore();
    }
  });
});

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  const dropBlocks = () => {
    if (!engineRef.current || !sceneRef.current) return;

    const { Bodies, Composite, Body } = Matter;
    const width = sceneRef.current.parentElement.clientWidth;

    const skills = [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "UI/UX",
      "Bootstrap",
      "JavaScript",
      "Git & GitHub",
      "Redux",
      "Docker",
      "REST API",
      "Vite",
      "AWS",
      "Python",
      "SQL"
    ];

    const blocks = [];

    skills.forEach((skill) => {
      const w = Math.random() * 50 + 110;
      const h = Math.random() * 15 + 55;

      const x = Math.random() * (width - 160) + 80;
      const y = -100 - Math.random() * 500;

      const block = Bodies.rectangle(x, y, w, h, {
        restitution: 0.5,
        friction: 0.1,
        density: 0.002,
        chamfer: { radius: 14 },
        render: { visible: false },
      });

      block.skillText = skill;
      Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.2);

      blocks.push(block);
    });

    Composite.add(engineRef.current.world, blocks);
  };

  return (
    <div
      ref={sceneRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
};

export default ProjectBlocks;