"use strict";
{
    // Donations
    const donationContainer = document.querySelector("div#donation-container");

    /**
     * @param {string} displayText 
     * @param {string} imgPath 
     * @param {string} bgColor 
     * @param {string} txtColor 
     * @param {string} site 
     */
    function addDonation(displayText, imgPath, bgColor, txtColor, site) {
        document.querySelector("a#no-donation")?.remove?.();

        donationContainer.appendChild(makeElement(
            "a",
            {
                innerText: displayText ?? site,
                title: site,
                href: site,
                className: "donation-prompt",
                style: {
                    backgroundImage: `url("${imgPath}")`,
                    backgroundColor: bgColor ?? "",
                    color: txtColor ?? ""
                }
            }
        ));
    }

    [
        [
            "StackUp 2022",
            "./assets/stackup.png",
            "gray",
            "white",
            "https://stackup.donordrive.com/index.cfm?fuseaction=donorDrive.team&teamID=5344"
        ],
        [
            "Contribute to funds",
            "./assets/contrib.png",
            void 0,
            "white",
            "../contact/index.html"
        ]
    ].forEach(/** @param {[string | undefined, string, string | undefined, string | undefined, string]} e */e => addDonation(...e));
}