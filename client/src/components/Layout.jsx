import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";

import styles from "./Layout.module.css";
import ClassSetup from "../pages/ClassSetup/ClassSetup";
import PreClassPage from "../pages/PreClass/PreClass";
import PostClassPage from "../pages/PostClass/PostClass";
import TrainingPage from "../pages/TrainingPage/TrainingPage";
import PracticePage from "../pages/PracticePage/PracticePage";
import MockTestPage from "../pages/MockTest/MockTestPage";

const NAV_ITEMS = [
  { to: "/class-setup", label: "Class setup" },
  { to: "/pre-class", label: "Pre Class" },
  { to: "/training", label: "Training" },
  { to: "/post-class", label: "Post Class" },
  { to: "/practice", label: "Practice" },
  { to: "/test", label: "Test" },
];

const Layout = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebarCollapsed") === "true";
    } catch {
      return false;
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    try {
      localStorage.setItem("sidebarCollapsed", collapsed ? "true" : "false");
    } catch (e) {
      console.log(e);
    }
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => setCollapsed((c) => !c);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className={styles.page}>
      <div>
        <aside
          className={[
            styles.sidebar,
            collapsed ? styles.collapsed : "",
            drawerOpen ? styles.open : "",
          ].join(" ")}
          aria-hidden={drawerOpen ? "false" : "false"}
        >
          <div className={styles.sidebarInner}>
            <div className={styles.brand}>
              <button
                className={styles.collapseBtn}
                onClick={toggleCollapse}
                aria-pressed={collapsed}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? "»" : "«"}
              </button>
              {!collapsed && (
                <span className={styles.brandText}>Classroom</span>
              )}
            </div>

            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.to} className={styles.navItem}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.navLink} ${styles.navLinkActive}`
                          : styles.navLink
                      }
                    >
                      <span className={styles.navIcon} aria-hidden>
                        {item.label.charAt(0)}
                      </span>
                      {!collapsed && (
                        <span className={styles.navLabel}>{item.label}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <button
            className={styles.drawerClose}
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            ✕
          </button>
        </aside>
      </div>
      <header className={styles.topbar}>
        <button
          aria-label="Open menu"
          className={styles.hamburger}
          onClick={openDrawer}
        >
          ☰
        </button>
        <div className={styles.topbarTitle}>Student Mate</div>
        <div className={styles.topbarSpacer} />
      </header>

      {drawerOpen && <div className={styles.overlay} onClick={closeDrawer} />}

      <main className={styles.main}>
        <Routes>
          <Route path="/class-setup" element={<ClassSetup />} />
          <Route path="/pre-class" element={<PreClassPage />} />
          <Route path="/post-class" element={<PostClassPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/test" element={<MockTestPage />} />
          <Route path="*" element={<ClassSetup />} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout;
