"use strict";
{
    // Donations
    const donationContainer = document.querySelector("div#donation-container");

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
            "StackUp",
            "./assets/stackup.png",
            "gray",
            "white",
            "https://stackup.donordrive.com/index.cfm?fuseaction=donorDrive.team&teamID=5344"
        ],
        [
            "Contribute to funds",
            "./assets/contrib.png",
            "",
            "white",
            "../contact/index.html"
        ]
    ].forEach(e => addDonation(...e));
}