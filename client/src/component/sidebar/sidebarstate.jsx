import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { sidebar } from "../../atom/store";

const useResponsiveSidebar = () => {
  const [sidebarState, setSidebarState] = useRecoilState(sidebar);

  useEffect(() => {
    // Function to update sidebar visibility based on screen size and path
    const updateSidebarState = () => {
      const isMobile = window.innerWidth < 768; // Mobile view: width less than 768px
      const currentPath = window.location.pathname; // Get the current path

      // Check if the path is '/collegedisplay'
      if (currentPath === "/collegedisplay") {
        setSidebarState(false); // Set sidebar to false for '/collegedisplay'
      } else {
        setSidebarState(!isMobile); // Set sidebar based on screen size for other paths
      }
    };

    // Call the function initially to set the sidebar state
    updateSidebarState();

    // Add event listener to handle window resizing
    window.addEventListener("resize", updateSidebarState);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSidebarState);
    };
  }, [setSidebarState]);

  return sidebarState;
};

export default useResponsiveSidebar;
