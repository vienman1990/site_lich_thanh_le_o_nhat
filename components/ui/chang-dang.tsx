import React from "react";
import LoiChua from "@/components/ui/loi-chua";

export interface ChangDangData {
  subtitle: string;
  title: string;
  loi_chua: {
    reference: string;
    content: string;
  };
  loi_chua_2?: {
    reference: string;
    content: string;
  };
  content: string;
}

interface ChangDangProps {
  data: ChangDangData;
  index: number;
}

export default function ChangDang({ data, index }: ChangDangProps) {
  return (
    <section>
      <div>
        <img src={`/img/chang-dang-thanh-gia/station0${index}.jpg`} alt={data.title} />
      </div>
      <div>
        <h2>{data.subtitle}</h2>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{data.title}</h3>
        <LoiChua
          reference={data.loi_chua.reference}
          content={data.loi_chua.content}
        />
        {/* show if have loi_chua_2 */}
        {data.loi_chua_2 && (
          <LoiChua
            reference={data.loi_chua_2.reference}
            content={data.loi_chua_2.content}
          />
        )}
        <div className="my-4 text-base/7 md:text-xl/8">
          <span
            dangerouslySetInnerHTML={{
              __html: data.content.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
