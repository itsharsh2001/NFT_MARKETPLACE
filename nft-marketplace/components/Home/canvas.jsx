import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

function UsersChart() {
  const canvasEl = useRef(null);
  const [labels, setLabels] = useState([]);
  const [weight, setWeight] = useState([]);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
    yellow: {
      default: "rgba(221, 242, 71, 1)",
      half: "rgba(221, 242, 71, 0.5)",
      quarter: "rgba(221, 242, 71, 0.25)",
      zero: "rgba(221, 242, 71, 0)",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const yellowGradient = ctx.createLinearGradient(0, 16, 0, 600);
    yellowGradient.addColorStop(0, colors.yellow.half);
    yellowGradient.addColorStop(0.65, colors.yellow.quarter);
    yellowGradient.addColorStop(1, colors.yellow.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "User Growth ",
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/growth`
      );
      const data = res.data.data.data;
      const lbls = [],
        wts = [];
      for (const ele of data) {
        lbls.push(ele._id);
        wts.push(ele.count);
      }
      setLabels(lbls);
      setWeight(wts);
    };
    getData();
  }, []);

  return (
    <div className='App'>
      <span>
        <strong>User growth</strong>
      </span>
      <span>
        <canvas id='myChart' ref={canvasEl} height='100' />
      </span>
    </div>
  );
}

function ItemsChart() {
  const canvasEl = useRef(null);
  const [labels, setLabels] = useState([]);
  const [weight, setWeight] = useState([]);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
    yellow: {
      default: "rgba(221, 242, 71, 1)",
      half: "rgba(221, 242, 71, 0.5)",
      quarter: "rgba(221, 242, 71, 0.25)",
      zero: "rgba(221, 242, 71, 0)",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const yellowGradient = ctx.createLinearGradient(0, 16, 0, 600);
    yellowGradient.addColorStop(0, colors.yellow.half);
    yellowGradient.addColorStop(0.65, colors.yellow.quarter);
    yellowGradient.addColorStop(1, colors.yellow.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: yellowGradient,
          label: "NFT Growth ",
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: colors.yellow.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.yellow.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/item/growth`
      );
      const data = res.data.data.data;
      const lbls = [],
        wts = [];
      for (const ele of data) {
        lbls.push(ele._id);
        wts.push(ele.count);
      }
      setLabels(lbls);
      setWeight(wts);
    };
    getData();
  }, []);

  return (
    <div className='App'>
      <span>
        <strong>NFT growth</strong>
      </span>
      <span>
        <canvas id='myChart' ref={canvasEl} height='100' />
      </span>
    </div>
  );
}

module.exports = { UsersChart, ItemsChart };
