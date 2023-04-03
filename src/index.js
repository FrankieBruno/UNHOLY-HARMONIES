import { Unholy } from "./components/Unholy"
import { createRoot } from "react-dom/client"
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Unholy />
    </BrowserRouter>
)

