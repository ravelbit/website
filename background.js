/**
 * @fileoverview Renders a static matrix of random bits as a background.
 * Redraws on window resize.
 * @author RavelBit
 */

'use strict';

/**
 * Font size in pixels for bits.
 * @const {number}
 */
const FONT_SIZE = 22;

/** @type {HTMLCanvasElement} */
let canvas;

/** @type {CanvasRenderingContext2D} */
let ctx;

/** @type {number} */
let width = window.innerWidth;

/** @type {number} */
let height = window.innerHeight;

/** @type {number} */
let cols;

/** @type {number} */
let rows;

/** @type {Array<Array<string>>} */
let bits;

/** @type {Array<number>} */
let offsets;

/** @type {Array<number>} */
let phases;

/**
 * Resizes the canvas to fit the window.
 */
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

/**
 * Initializes the bit matrix and related arrays.
 */
function initBits() {
    cols = Math.floor(width / FONT_SIZE) + 2;
    rows = Math.floor(height / FONT_SIZE) + 2;
    bits = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => Math.random() > 0.5 ? '1' : '0')
    );
    offsets = Array.from({ length: cols }, () => Math.random() * 1000);
    phases = Array.from({ length: cols }, () => Math.random() * Math.PI * 2);
}

/**
 * Draws the static bit matrix background.
 */
function drawBits() {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${FONT_SIZE}px Fira Mono, Menlo, monospace`;
    ctx.fillStyle = '#2a3e5c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < cols; i++) {
        const x = i * FONT_SIZE + FONT_SIZE / 2;
        const phase = phases[i];

        for (let j = 0; j < rows; j++) {
            const y = (j * FONT_SIZE + FONT_SIZE / 2) +
                (Math.sin(offsets[i] + phase + j * 0.16) * 2.2);
            ctx.globalAlpha = 0.33 + 0.19 * Math.sin(j * 0.2 + i * 0.1);
            ctx.fillText(bits[i][j], x, y);
        }
    }

    ctx.globalAlpha = 1.0;
}

/**
 * Handles window resize: resizes canvas, re-initializes bits, and redraws.
 */
function handleResize() {
    resizeCanvas();
    initBits();
    drawBits();
}

/**
 * Initializes the background animation after DOM is loaded.
 */
function initBackground() {
    canvas = document.getElementById('bg-canvas');
    ctx = canvas.getContext('2d');

    handleResize();
    window.addEventListener('resize', handleResize);
}

// Wait for DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', initBackground);
