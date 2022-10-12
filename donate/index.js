(() => {
    // Donations
    const donationContainer = document.querySelector("div#donation-container");

    function addDonation(displayText, imgPath, site) {
        const container = document.createElement("div"),
            link = document.createElement("a");

        link.innerText = displayText;
        link.href = site;
        container.className = "donation-prompt";
        container.style.backgroundImage = `url("${imgPath}")`;

        container.appendChild(link);

        document.querySelector("div#no-donation")?.remove?.();
        donationContainer.appendChild(container);
    }

    [
        [
            "StackUp",
            "",
            "https://stackup.donordrive.com/index.cfm?fuseaction=donorDrive.team&teamID=5344"
        ]
    ].forEach(e => addDonation(...e));
})();