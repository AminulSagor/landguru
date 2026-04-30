"use client";

import { FileText } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { useState } from "react";
import OrganizeVerifyDocumentsDialog from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/organize-verify-document-dialog";
import { DocKind } from "@/app/(dashboard)/admin/types/property.types";
import type {
  PropertyPostDocument,
  PropertyPostItem,
} from "@/types/admin/property-post/property.types";

function getFileName(fileUrl: string) {
  const segments = fileUrl.split("/").filter(Boolean);

  return segments[segments.length - 1] ?? fileUrl;
}

function toDocKind(fileUrl: string): DocKind {
  const extension = getFileName(fileUrl).split(".").pop()?.toLowerCase();

  if (!extension) return "other";
  if (["jpg", "jpeg", "png", "webp", "avif"].includes(extension)) return "image";
  if (extension === "pdf") return "pdf";
  if (extension === "doc") return "doc";
  if (extension === "docx") return "docx";

  return "other";
}

function toDocSizeLabel(fileUrl: string) {
  const extension = getFileName(fileUrl).split(".").pop()?.toUpperCase();

  if (!extension) return "FILE";

  return `${extension} File`;
}

function resolveDocuments(property: PropertyPostItem) {
  if (property.documents?.length) {
    return property.documents;
  }

  const fallback: PropertyPostDocument[] = [];

  (property.deedFiles ?? []).forEach((fileUrl) => {
    fallback.push({ fileUrl, category: "DEED" });
  });

  (property.khatianFiles ?? []).forEach((fileUrl) => {
    fallback.push({ fileUrl, category: "KHATIAN" });
  });

  (property.otherFiles ?? []).forEach((fileUrl) => {
    fallback.push({ fileUrl, category: "OTHER" });
  });

  return fallback;
}

function DocTile({ name, sizeLabel }: { name: string; sizeLabel: string }) {
  return (
    <div className="border border-gray/15 rounded-lg p-4 bg-white">
      <div className="h-10 w-10 rounded-full bg-secondary border border-gray/15 flex items-center justify-center mb-3">
        <FileText size={18} className="text-primary" />
      </div>
      <p className="text-xs font-extrabold text-gray">{name}</p>
      <p className="text-xs font-semibold text-gray mt-1">{sizeLabel}</p>
    </div>
  );
}

export default function DocumentsCard({
  property,
  canReorganize = true,
}: {
  property: PropertyPostItem;
  canReorganize?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const documents = resolveDocuments(property);
  const deedDocs = documents.filter((doc) => doc.category === "DEED");
  const khatianDocs = documents.filter((doc) => doc.category === "KHATIAN");
  const otherDocs = documents.filter(
    (doc) => doc.category !== "DEED" && doc.category !== "KHATIAN",
  );
  const sections = [
    {
      title: "Deed",
      items: deedDocs.map((doc) => ({
        name: getFileName(doc.fileUrl),
        sizeLabel: toDocSizeLabel(doc.fileUrl),
        kind: toDocKind(doc.fileUrl),
        url: doc.fileUrl,
      })),
    },
    {
      title: "Khatian",
      items: khatianDocs.map((doc) => ({
        name: getFileName(doc.fileUrl),
        sizeLabel: toDocSizeLabel(doc.fileUrl),
        kind: toDocKind(doc.fileUrl),
        url: doc.fileUrl,
      })),
    },
    {
      title: "Others",
      items: otherDocs.map((doc) => ({
        name: getFileName(doc.fileUrl),
        sizeLabel: toDocSizeLabel(doc.fileUrl),
        kind: toDocKind(doc.fileUrl),
        url: doc.fileUrl,
      })),
    },
  ].filter((section) => section.items.length > 0);

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-gray">Documents</p>

        {/*  disabled look  when false */}
        {canReorganize ? (
          <Button size="sm" variant="primary" onClick={() => setOpen(true)}>
            Reorganize Documents
          </Button>
        ) : (
          <Button
            size="sm"
            disabled
            className="bg-secondary border border-gray/15 text-gray"
          >
            Reorganize Documents
          </Button>
        )}
      </div>

      {sections.length === 0 ? (
        <div className="h-56 flex items-center justify-center">
          <p className="text-sm font-semibold text-gray">
            None
          </p>
        </div>
      ) : (
        <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4 space-y-6">
          {sections.map((sec) => (
            <div key={sec.title}>
              <p className="text-xs font-extrabold text-gray mb-3">
                {sec.title}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sec.items.map((d, index) => (
                  <DocTile key={index} name={d.name} sizeLabel={d.sizeLabel} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* organize dialog */}
      <OrganizeVerifyDocumentsDialog open={open} onOpenChange={setOpen} />
    </Card>
  );
}
