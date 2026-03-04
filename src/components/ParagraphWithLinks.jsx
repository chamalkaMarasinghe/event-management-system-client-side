import React from "react";

const ParagraphWithLinks = ({ text }) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

    // Convert URLs into <a> tags safely
    const formattedText = text.replace(urlRegex, (url) => {
        const href = url.startsWith("http") ? url : `https://${url}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:#007bff; text-decoration:underline;">${url}</a>`;
    });

    return (
        <p
            dangerouslySetInnerHTML={{ __html: formattedText }}
            style={{ whiteSpace: "pre-line" }}
        />
    );
};

export default ParagraphWithLinks;
