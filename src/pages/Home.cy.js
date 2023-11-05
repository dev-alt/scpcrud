describe("Home Component", () => {
    it("should display the banner image", () => {
      cy.get("img[src$='banner.jpg']").should("be.visible");
    });
  
    it("should navigate to a detail page when a link is clicked", () => {
      // Replace with the actual URL of a detail page
      const detailUrl = "/detail/yourItemId";
  
      cy.get("a[href='" + detailUrl + "']").click();
      cy.url().should("include", detailUrl);
    });
  
    it("should show loading spinner initially", () => {
      cy.get("div").contains("Loading...").should("be.visible");
    });
  
    it("should navigate to the next page when 'Next Page' button is clicked", () => {
      // Replace with the actual selector for the 'Next Page' button
      const nextPageButtonSelector = "your-selector-for-next-button";
  
      cy.get(nextPageButtonSelector).click();
      // Add assertions for the expected behavior after clicking 'Next Page'.
    });
  
    it("should show less text when 'Show Less' button is clicked", () => {
      // Replace with the actual selector for the 'Show Less' button
      const showLessButtonSelector = "your-selector-for-show-less-button";
  
      cy.get(showLessButtonSelector).click();
      // Add assertions for the expected behavior after clicking 'Show Less'.
    });
  });
  