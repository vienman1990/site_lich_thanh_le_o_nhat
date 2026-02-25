import React from "react";

interface LoiChuaProps {
  reference?: string;
  content: string;
}

export default function LoiChua({ reference, content }: LoiChuaProps) {
  return (
    <div className="bg-linear-to-br from-yellow-50 to-white border-l-4 border-yellow-400 shadow-md rounded-lg p-6 my-10">
      {reference && (
        <div className="text-sm md:text-lg text-yellow-600 italic mb-2">{reference}</div>
      )}
      <blockquote className="text-lg md:text-2xl text-gray-800 leading-relaxed pl-4">
        {/* show html break line */}
        <span
          dangerouslySetInnerHTML={{
            __html: content.replace(/\n/g, "<br />")
          }}
        />
      </blockquote>
    </div>
  );
}
