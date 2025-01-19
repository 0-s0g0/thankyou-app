"use client";

import { useEffect, useState } from "react";
import Matter from "matter-js";
import { createEngine } from "./utils/matterEngine";
import { createGround, createWallleft, createWallright, addBodiesToWorld } from "./utils/matterBodies";
import Header from "../components/Header";
import DataModal from "./components/dataModal";
import styles from './css/analysis.module.css';
import { createCanvasOverlayAnimation } from "./utils/AnimationOverlay";
import GeminiButton from "./text/page";
import ThankYouPage from "./text/thanks";
import { createClient } from '../utils/supabase/client';

// Type definitions
export type Color = {
  color1: string;
  color2: string;
};

export type Member = {
  id: string;
  name: string;
};

export type Group = {
  id: string;
  make_user: string;
  group_name: string;
  members: Member[] | string; // JSON形式にも対応
  description: Color;
};

// Modified to create balls with gradient colors
const createBallsByGroups = (groups: Group[]) => {
  const { Bodies } = Matter;

  return groups.map((group) => {
    // JSON形式の`members`をパース
    const membersArray = typeof group.members === "string" ? JSON.parse(group.members) : group.members;
    const memberCount = Array.isArray(membersArray) ? membersArray.length : 0;

    const radius = 55 + (memberCount * 5);

    // Create canvas for gradient
    const canvas = document.createElement('canvas');
    const size = radius * 2;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, group.description.color1);
      gradient.addColorStop(1, group.description.color2);

      // Fill circle with gradient
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    return Bodies.circle(
      Math.random() * 300 + 50,
      Math.random() * 100 + 50,
      radius,
      {
        restitution: 0.9,
        render: {
          sprite: {
            texture: canvas.toDataURL(),
            xScale: 1,
            yScale: 1,
          },
        },
      }
    );
  });
};

const MatterScene = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          id,
          make_user,
          group_name,
          description,
          members
        `); // `members`はJSON形式として取得

      if (error) {
        console.error('Error fetching groups:', error);
        return;
      }

      setGroups(data || []);
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    if (groups.length === 0) return;

    const { engine, render } = createEngine();
    const ground = createGround();
    const wallleft = createWallleft();
    const wallright = createWallright();
    const balls = createBallsByGroups(groups);

    // Add custom text (group names) to balls
    balls.forEach((ball, index) => {
      ball.customText = groups[index].group_name;
    });

    addBodiesToWorld(engine, [ground, wallleft, wallright, ...balls]);

    // Render text on balls
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      balls.forEach((ball) => {
        if (ball.customText) {
          ctx.font = "14px Arial";
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(ball.customText, ball.position.x, ball.position.y);
        }
      });
    });

    // Add overlay canvas
    const overlayCanvas = document.createElement("canvas");
    overlayCanvas.id = "overlay-canvas";
    overlayCanvas.width = 375;
    overlayCanvas.height = 400;
    overlayCanvas.style.position = "absolute";
    overlayCanvas.style.top = "0";
    overlayCanvas.style.left = "0";
    overlayCanvas.style.pointerEvents = "none";
    document.getElementById("canvas-area")?.appendChild(overlayCanvas);

    // Handle ball clicks
    render.canvas.addEventListener("mousedown", (event) => {
      const rect = render.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const clickedBallIndex = balls.findIndex((ball) => {
        const dx = ball.position.x - x;
        const dy = ball.position.y - y;
        return Math.sqrt(dx * dx + dy * dy) < (ball.circleRadius || 0);
      });

      if (clickedBallIndex !== -1) {
        const clickedBall = balls[clickedBallIndex];
        const group = groups[clickedBallIndex];
        
        setSelectedGroup(group);
        setTimeout(() => setIsModalOpen(true), 1000);

        Matter.Body.applyForce(
          clickedBall,
          { x: clickedBall.position.x, y: clickedBall.position.y },
          { x: 0, y: -0.5 }
        );

        // Create gradient for overlay animation
        // クリックしたボールのグループIDを引数として渡す
          setTimeout(() => {
            const group = groups[clickedBallIndex];
            createCanvasOverlayAnimation(
              "overlay-canvas", // キャンバスID
              x, // クリック位置X
              y, // クリック位置Y
              group.id // グラデーションの色
            );
          }, 300);

      }
    });
  }, [groups]);

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      <Header />
      <div className={styles.box18}>
        <p>About Groups</p>
      </div>

      <div
        id="canvas-area"
        style={{
          width: "375px",
          height: "370px",
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          position: "relative"
        }}
      />

      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-2 bg-pink-300 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        ページを再読み込み
      </button>

      {selectedGroup && (
        <DataModal
          isOpened={isModalOpen}
          onClose={closeModal}
          groupId={selectedGroup.id}
          groupName={selectedGroup.group_name}
        />
      )}

      <div className={styles.box18}>
        <p>About Me</p>
      </div>

      <GeminiButton />
      
    </div>
  );
};

export default MatterScene;
