/* Neon vector art: platforms, lava and the grabbing hand, riders on their space-birds, eggs, the wraith, bosses and capsules. No image files. */
(function (G) {
  'use strict';
  const U = G.U, C = G.C, GFX = G.gfx, TAU = U.TAU;
  const Art = {};
  const hexA = (hex, a) => { const n = parseInt(hex.replace('#', ''), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; };

  Art.drawPlatform = function (ctx, p, th, t) {
    const r = 6;
    ctx.save();
    ctx.fillStyle = '#0a1230';
    ctx.beginPath();
    ctx.moveTo(p.x + r, p.y); ctx.lineTo(p.x + p.w - r, p.y); ctx.quadraticCurveTo(p.x + p.w, p.y, p.x + p.w, p.y + r);
    ctx.lineTo(p.x + p.w, p.y + p.h - r); ctx.quadraticCurveTo(p.x + p.w, p.y + p.h, p.x + p.w - r, p.y + p.h);
    ctx.lineTo(p.x + r, p.y + p.h); ctx.quadraticCurveTo(p.x, p.y + p.h, p.x, p.y + p.h - r); ctx.lineTo(p.x, p.y + r); ctx.quadraticCurveTo(p.x, p.y, p.x + r, p.y);
    ctx.fill();
    ctx.strokeStyle = hexA(th.rim, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.strokeStyle = th.rim; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(p.x + 3, p.y + 0.5); ctx.lineTo(p.x + p.w - 3, p.y + 0.5); ctx.stroke();
    ctx.fillStyle = hexA(th.rim, 0.25);
    for (let x = p.x + 14; x < p.x + p.w - 8; x += 22) ctx.fillRect(x, p.y + 5, 10, 3);
    ctx.restore();
  };
  Art.platformGlow = function (ctx, p, th) {
    GFX.drawGlow(ctx, hexA(th.rim, 1), p.x + p.w / 2, p.y, Math.max(40, p.w * 0.5), 0.14);
  };

  Art.drawLava = function (ctx, t, th) {
    const y0 = C.LAVA_Y, W = C.W, H = C.H;
    const g = ctx.createLinearGradient(0, y0 - 6, 0, H);
    g.addColorStop(0, th.lava[1]); g.addColorStop(0.25, th.lava[0]); g.addColorStop(1, '#2a0508');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 12) ctx.lineTo(x, y0 + 3 * Math.sin(x * 0.03 + t * 2) + 2.4 * Math.sin(x * 0.07 - t * 3.1));
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.globalCompositeOperation = 'lighter';
    const gg = ctx.createLinearGradient(0, y0 - 40, 0, y0 + 6);
    gg.addColorStop(0, 'rgba(255,120,40,0)'); gg.addColorStop(1, hexA(th.lava[0], 0.35));
    ctx.fillStyle = gg; ctx.fillRect(0, y0 - 40, W, 46);
    ctx.fillStyle = hexA(th.lava[1], 0.55);
    for (let i = 0; i < 14; i++) { const bx = (i * 83 + t * 24) % W, by = y0 + 8 + ((i * 37 + t * 30) % 30); ctx.beginPath(); ctx.arc(bx, by, 2 + (i % 3), 0, TAU); ctx.fill(); }
    ctx.globalCompositeOperation = 'source-over';
  };

  /* the grabbing hand: an arm rising out of the lava to hold on to y */
  Art.drawHand = function (ctx, x, y, t, th) {
    ctx.save();
    ctx.strokeStyle = '#ff6a3a'; ctx.fillStyle = '#4a0a0a'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.rect(x - 7, y, 14, C.LAVA_Y - y + 6); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y, 11, 8, 0, 0, TAU); ctx.fill(); ctx.stroke();
    for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x + i * 4, y - 3); ctx.quadraticCurveTo(x + i * 6 + Math.sin(t * 9 + i) * 2, y - 14, x + i * 3.2, y - 17 - (i === 0 ? 3 : 0)); ctx.stroke(); }
    GFX.drawGlow(ctx, 'rgba(255,90,40,1)', x, y, 24, 0.5);
    ctx.restore();
  };

  /* ---------- riders ---------- */
  const PAL = {
    player: { body: '#1f6a9a', hi: '#7ee8ff', wing: '#5ad0ff', lance: '#ffe45a' },
  };
  Art.drawRider = function (ctx, e, t, o) {
    const pal = e.tier === undefined ? PAL.player : { body: C.TIERS[e.tier].body, hi: C.TIERS[e.tier].col, wing: C.TIERS[e.tier].col, lance: '#fff' };
    const big = e.scale || 1;
    ctx.save();
    ctx.translate(e.x, e.y);
    if (o && o.blink) { ctx.restore(); return; }
    ctx.scale(e.face * big, big);
    const w = Math.sin(e.flapA || 0), ground = e.ground;
    GFX.drawGlow(ctx, hexA(pal.hi, 1), 0, 2, 30, 0.3);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    /* tail */
    ctx.strokeStyle = pal.hi; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-12, 6); ctx.lineTo(-22, 2 + w * 2); ctx.moveTo(-12, 8); ctx.lineTo(-22, 9 + w); ctx.stroke();
    /* far wing */
    ctx.fillStyle = hexA(pal.wing, 0.28);
    ctx.beginPath(); ctx.moveTo(-2, 4); ctx.quadraticCurveTo(-8, 2 - 16 * w, -18, 6 - 22 * w); ctx.quadraticCurveTo(-8, 8 - 6 * w, -2, 8); ctx.fill();
    /* legs */
    if (ground) {
      const k = Math.sin(e.run || 0) * 4;
      ctx.strokeStyle = pal.hi; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-3, 12); ctx.lineTo(-3 + k, 19); ctx.moveTo(4, 12); ctx.lineTo(4 - k, 19); ctx.stroke();
    } else {
      ctx.strokeStyle = pal.hi; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(-3, 12); ctx.lineTo(-6, 17); ctx.moveTo(4, 12); ctx.lineTo(2, 17); ctx.stroke();
    }
    /* body, neck, head, beak */
    ctx.fillStyle = pal.body; ctx.strokeStyle = pal.hi; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, 7, 14, 8, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(9, 3); ctx.quadraticCurveTo(15, -2, 15, -6); ctx.stroke();
    ctx.fillStyle = pal.body; ctx.beginPath(); ctx.arc(15, -7, 4.6, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffd24a'; ctx.beginPath(); ctx.moveTo(19, -8); ctx.lineTo(26, -5.5); ctx.lineTo(19, -4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(16.5, -8, 1.3, 0, TAU); ctx.fill();
    /* rider */
    ctx.fillStyle = pal.hi; ctx.fillRect(-4, -13, 7, 10);
    ctx.fillStyle = '#e8f4ff'; ctx.beginPath(); ctx.arc(-0.5, -17, 4.4, 0, TAU); ctx.fill();
    ctx.fillStyle = pal.hi; ctx.fillRect(-5, -20, 9, 2.4);
    /* lance */
    const L = e.lance || 34;
    ctx.strokeStyle = pal.lance; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(2, -10); ctx.lineTo(2 + L, -15); ctx.stroke();
    GFX.drawGlow(ctx, 'rgba(255,240,160,1)', 2 + L, -15, 11, 0.7);
    /* near wing */
    ctx.fillStyle = hexA(pal.wing, 0.55); ctx.strokeStyle = pal.wing; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-1, 5); ctx.quadraticCurveTo(-10, 3 - 18 * w, -22, 7 - 24 * w); ctx.quadraticCurveTo(-10, 10 - 6 * w, -1, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (o && o.shield) { ctx.strokeStyle = 'rgba(125,255,176,' + (0.55 + 0.3 * Math.sin(t * 10)) + ')'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(2, 0, 26, 28, 0, 0, TAU); ctx.stroke(); }
    if (o && o.big) { ctx.strokeStyle = 'rgba(255,240,120,0.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(2 + L, -15, 9 + Math.sin(t * 14), 0, TAU); ctx.stroke(); }
    ctx.restore();
  };

  Art.drawEgg = function (ctx, g, t) {
    const hatch = g.hatching > 0, wob = hatch ? Math.sin(t * 40) * 0.25 : Math.sin(t * 3 + g.x) * 0.05;
    ctx.save(); ctx.translate(g.x, g.y); ctx.rotate(wob);
    const col = C.TIERS[g.tier].col;
    GFX.drawGlow(ctx, hexA(col, 1), 0, 0, hatch ? 30 : 20, hatch ? 0.8 : 0.45);
    const gr = ctx.createRadialGradient(-2, -3, 1, 0, 0, 11);
    gr.addColorStop(0, '#fff'); gr.addColorStop(0.5, hatch && Math.floor(t * 12) % 2 ? '#fff' : col); gr.addColorStop(1, hexA(col, 0.4));
    ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(0, 0, 8, 10.5, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.stroke();
    if (hatch) { ctx.beginPath(); ctx.moveTo(-5, -2); ctx.lineTo(-1, 1); ctx.lineTo(2, -3); ctx.lineTo(6, 1); ctx.stroke(); }
    ctx.restore();
  };

  Art.drawWraith = function (ctx, w, t) {
    ctx.save(); ctx.translate(w.x, w.y); ctx.scale(w.face, 1);
    const f = Math.sin(t * 12);
    GFX.drawGlow(ctx, 'rgba(170,120,255,1)', 0, 0, 56, 0.45);
    ctx.fillStyle = 'rgba(30,16,60,0.9)'; ctx.strokeStyle = '#c9a0ff'; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-30, -2 - f * 14); ctx.quadraticCurveTo(-8, -10, 14, -4); ctx.lineTo(14, 8); ctx.quadraticCurveTo(-8, 12, -30, 6 + f * 14); ctx.quadraticCurveTo(-18, 2, -30, -2 - f * 14); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -9); ctx.lineTo(32, -2); ctx.lineTo(10, 1); ctx.closePath(); ctx.fillStyle = 'rgba(30,16,60,0.9)'; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, 9); ctx.lineTo(30, 4); ctx.lineTo(10, 1); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ff3d5a'; ctx.beginPath(); ctx.arc(8, -5, 2.6, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(14, 1); ctx.lineTo(30, 1); ctx.stroke();
    ctx.restore();
  };

  Art.drawBoss = function (ctx, b, t) {
    const sk = C.BOSSES[b.skin];
    ctx.save(); ctx.translate(b.x, b.y); ctx.scale(b.face, 1);
    const f = Math.sin(t * 5), hit = b.flash > 0;
    GFX.drawGlow(ctx, hexA(sk.col, 1), 0, 0, 120, 0.4);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.fillStyle = hexA(sk.col, 0.25); ctx.strokeStyle = sk.col; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-10, -4); ctx.quadraticCurveTo(-60, -50 - f * 30, -110, -10 - f * 40); ctx.quadraticCurveTo(-60, 10, -10, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = hit ? '#fff' : '#161a3a'; ctx.beginPath(); ctx.ellipse(0, 4, 56, 30, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, -6); ctx.quadraticCurveTo(66, -16, 68, -34); ctx.stroke();
    ctx.fillStyle = hit ? '#fff' : '#161a3a'; ctx.beginPath(); ctx.arc(70, -36, 15, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffd24a'; ctx.beginPath(); ctx.moveTo(82, -42); ctx.lineTo(108, -32); ctx.lineTo(82, -26); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff3d5a'; ctx.beginPath(); ctx.arc(74, -40, 3.4, 0, TAU); ctx.fill();
    for (let i = 0; i < 4; i++) { ctx.strokeStyle = sk.col; ctx.beginPath(); ctx.moveTo(-30 + i * 18, -22); ctx.lineTo(-24 + i * 18, -34 - (i % 2) * 5); ctx.stroke(); }
    /* the weak spot on its back */
    const pu = 0.6 + 0.4 * Math.sin(t * 8);
    GFX.drawGlow(ctx, 'rgba(255,255,160,1)', 0, -26, 30, 0.8 * pu);
    ctx.fillStyle = '#fff6a8'; ctx.beginPath(); ctx.arc(0, -26, 8 + pu * 2, 0, TAU); ctx.fill();
    ctx.restore();
  };

  const CAP = { S: ['#7dffb0', 'S'], R: ['#ff7a3d', 'R'], L: ['#ffe45a', 'L'], M: ['#7ee8ff', 'M'], U: ['#ffffff', '1UP'] };
  Art.CAP = CAP;
  Art.drawCapsule = function (ctx, c, t) {
    const col = CAP[c.type];
    ctx.save(); ctx.translate(c.x, c.y);
    GFX.drawGlow(ctx, hexA(col[0], 1), 0, 0, 24, 0.55);
    ctx.rotate(t * 2); ctx.strokeStyle = col[0]; ctx.lineWidth = 2; ctx.fillStyle = 'rgba(8,12,30,0.85)';
    ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * TAU / 6; ctx.lineTo(Math.cos(a) * 11, Math.sin(a) * 11); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.rotate(-t * 2);
    ctx.fillStyle = '#fff'; ctx.font = '900 ' + (c.type === 'U' ? 9 : 12) + 'px "Segoe UI", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(col[1], 0, 1);
    ctx.restore();
  };

  Art.drawPad = function (ctx, x, y, k, th) {
    ctx.save(); ctx.strokeStyle = th.rim; ctx.globalAlpha = 0.9 * (1 - k); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y - 4, 40 * (1 - k * 0.7), 18 * (1 - k * 0.7), 0, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.5 * (1 - k); ctx.beginPath(); ctx.ellipse(x, y - 4, 22 * (1 - k * 0.7), 9 * (1 - k * 0.7), 0, 0, TAU); ctx.stroke();
    ctx.restore();
  };

  Art.drawBolt = function (ctx, b, t) {
    GFX.drawGlow(ctx, 'rgba(190,120,255,1)', b.x, b.y, 18, 0.8);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, TAU); ctx.fill();
  };

  Art.drawRiderIcon = function (ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = '#7ee8ff'; ctx.beginPath(); ctx.ellipse(0, 5, 11, 6, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#e8f4ff'; ctx.beginPath(); ctx.arc(0, -5, 4, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#ffe45a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(3, -2); ctx.lineTo(16, -6); ctx.stroke();
    ctx.restore();
  };

  G.art = Art;
})((window.SGS = window.SGS || {}));
