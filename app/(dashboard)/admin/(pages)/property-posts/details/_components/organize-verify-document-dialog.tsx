// app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/organize-verify-document-dialog.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { Eye, Trash2, GripVertical, Upload, Plus, Save } from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";

type DocSection = "deed" | "khatian" | "other";

type DocItem = {
  id: string;
  name: string;
  section: DocSection;
  file?: File;
  url?: string;
};

/* ---------------- helpers ---------------- */

function uid(prefix = "doc") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function extFromName(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

function fileBadge(ext: string) {
  if (!ext) return "FILE";
  return ext.toUpperCase().slice(0, 4);
}

function thumbClass(_ext: string) {
  // screenshot vibe (soft tile)
  return "bg-secondary border border-gray/15";
}

/* ---------------- UI pieces (STATIC) ---------------- */

function SectionHeader({
  title,
  onUpload,
}: {
  title: string;
  onUpload: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold tracking-wide text-gray">{title}</p>

      <Button
        size="sm"
        className="bg-white border border-primary/30 text-primary hover:bg-primary/5 shadow-none"
        onClick={onUpload}
      >
        <Plus size={14} />
        Upload
      </Button>
    </div>
  );
}

function DropIndicator({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="my-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 py-5 text-center">
      <p className="text-xs font-semibold text-primary">
        Drop item here to reorder
      </p>
    </div>
  );
}

function DocRow({
  item,
  section,
  index,
  draggingId,
  renamingId,
  renameValue,
  setRenameValue,
  setRenamingId,
  setOverKey,
  overKey,
  onStartDrag,
  onEndDrag,
  onDropAt,
  onView,
  onDelete,
  onCommitRename,
}: {
  item: DocItem;
  section: DocSection;
  index: number;

  draggingId: string | null;

  renamingId: string | null;
  renameValue: string;
  setRenameValue: (v: string) => void;
  setRenamingId: (v: string | null) => void;

  overKey: string | null;
  setOverKey: (v: string | null) => void;

  onStartDrag: (id: string) => void;
  onEndDrag: () => void;
  onDropAt: (section: DocSection, index: number) => void;

  onView: (item: DocItem) => void;
  onDelete: (id: string) => void;

  onCommitRename: (id: string, nextName: string) => void;
}) {
  const ext = extFromName(item.name);
  const isDragging = draggingId === item.id;

  const showIndicator =
    overKey === `${section}::${index}` && draggingId && draggingId !== item.id;

  return (
    <>
      <DropIndicator show={!!showIndicator} />

      <div
        draggable
        onDragStart={() => onStartDrag(item.id)}
        onDragEnd={onEndDrag}
        onDragOver={(e) => {
          e.preventDefault();
          setOverKey(`${section}::${index}`);
        }}
        onDrop={(e) => {
          e.preventDefault();
          onDropAt(section, index);
        }}
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border border-gray/15 bg-white px-3 py-2",
          isDragging && "opacity-60"
        )}
      >
        {/* left */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center text-gray/60">
            <GripVertical size={16} />
          </div>

          <div
            className={cn(
              "h-9 w-9 rounded-md flex items-center justify-center text-xs font-bold text-gray",
              thumbClass(ext)
            )}
          >
            {fileBadge(ext)}
          </div>

          <div className="min-w-0">
            {renamingId === item.id ? (
              <input
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => {
                  const next = renameValue.trim();
                  if (next) onCommitRename(item.id, next);
                  setRenamingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const next = renameValue.trim();
                    if (next) onCommitRename(item.id, next);
                    setRenamingId(null);
                  }
                  if (e.key === "Escape") setRenamingId(null);
                }}
                className="w-full rounded-md border border-gray/15 bg-white px-2 py-1 text-xs text-gray outline-none focus:border-primary/40"
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setRenamingId(item.id);
                  setRenameValue(item.name);
                }}
                className="truncate text-left text-xs font-semibold text-gray hover:underline"
                title="Click to rename"
              >
                {item.name}
              </button>
            )}
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onView(item)}
            className="rounded-md p-2 text-gray hover:bg-secondary"
            aria-label="View"
            title="View"
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="rounded-md p-2 text-gray hover:bg-secondary"
            aria-label="Delete"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function DocSectionBlock({
  title,
  section,
  list,
  draggingId,
  overKey,
  setOverKey,
  inputRef,
  onUploadClick,
  onFilesSelected,
  onDropEnd,
  onDropAt,
  onStartDrag,
  onEndDrag,
  renamingId,
  renameValue,
  setRenameValue,
  setRenamingId,
  onCommitRename,
  onView,
  onDelete,
}: {
  title: string;
  section: DocSection;
  list: DocItem[];

  draggingId: string | null;

  overKey: string | null;
  setOverKey: (v: string | null) => void;

  inputRef: (el: HTMLInputElement | null) => void;
  onUploadClick: () => void;
  onFilesSelected: (files: FileList) => void;

  onDropEnd: (section: DocSection) => void;
  onDropAt: (section: DocSection, index: number) => void;

  onStartDrag: (id: string) => void;
  onEndDrag: () => void;

  renamingId: string | null;
  renameValue: string;
  setRenameValue: (v: string) => void;
  setRenamingId: (v: string | null) => void;
  onCommitRename: (id: string, nextName: string) => void;

  onView: (item: DocItem) => void;
  onDelete: (id: string) => void;
}) {
  const overEnd = overKey === `${section}::end`;

  return (
    <div className="mt-4">
      <SectionHeader title={title} onUpload={onUploadClick} />

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
          if (e.target.files) onFilesSelected(e.target.files);
          e.currentTarget.value = "";
        }}
      />

      <div className="mt-2 space-y-2">
        {list.map((item, idx) => (
          <DocRow
            key={item.id}
            item={item}
            section={section}
            index={idx}
            draggingId={draggingId}
            overKey={overKey}
            setOverKey={setOverKey}
            onStartDrag={onStartDrag}
            onEndDrag={onEndDrag}
            onDropAt={onDropAt}
            onView={onView}
            onDelete={onDelete}
            renamingId={renamingId}
            renameValue={renameValue}
            setRenameValue={setRenameValue}
            setRenamingId={setRenamingId}
            onCommitRename={onCommitRename}
          />
        ))}

        {/* drop-to-end zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOverKey(`${section}::end`);
          }}
          onDrop={(e) => {
            e.preventDefault();
            onDropEnd(section);
          }}
          className="rounded-lg"
        >
          <DropIndicator show={!!overEnd && !!draggingId} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- main dialog ---------------- */

export default function OrganizeVerifyDocumentsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [items, setItems] = useState<DocItem[]>([
    { id: uid("deed"), name: "Deed document 1.pdf", section: "deed" },
    { id: uid("deed"), name: "Deed document 2.pdf", section: "deed" },
    { id: uid("deed"), name: "Deed document 3.pdf", section: "deed" },
    { id: uid("khatian"), name: "CS Khatian.pdf", section: "khatian" },
    { id: uid("khatian"), name: "RS Khatian.pdf", section: "khatian" },
    { id: uid("other"), name: "Other_document.pdf", section: "other" },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overKey, setOverKey] = useState<string | null>(null);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const fileInputs = useRef<Record<DocSection, HTMLInputElement | null>>({
    deed: null,
    khatian: null,
    other: null,
  });

  const bySection = useMemo(() => {
    const deed = items.filter((i) => i.section === "deed");
    const khatian = items.filter((i) => i.section === "khatian");
    const other = items.filter((i) => i.section === "other");
    return { deed, khatian, other };
  }, [items]);

  function openUpload(section: DocSection) {
    fileInputs.current[section]?.click();
  }

  function addFiles(section: DocSection, files: FileList | File[]) {
    const arr = Array.from(files);
    if (!arr.length) return;

    setItems((prev) => [
      ...prev,
      ...arr.map((f) => ({
        id: uid(section),
        name: f.name,
        section,
        file: f,
        url: URL.createObjectURL(f),
      })),
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function viewItem(item: DocItem) {
    if (item.url) window.open(item.url, "_blank");
    else alert("No preview available (demo).");
  }

  function commitRename(id: string, next: string) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, name: next } : x)));
  }

  function handleDragStart(id: string) {
    setDraggingId(id);
  }

  function handleDragEnd() {
    setDraggingId(null);
    setOverKey(null);
  }

  function moveItem(dragId: string, targetSection: DocSection, targetIndex: number) {
    setItems((prev) => {
      const dragged = prev.find((x) => x.id === dragId);
      if (!dragged) return prev;

      const others = prev.filter((x) => x.id !== dragId);

      const deed = others.filter((x) => x.section === "deed");
      const khatian = others.filter((x) => x.section === "khatian");
      const other = others.filter((x) => x.section === "other");

      const map: Record<DocSection, DocItem[]> = { deed, khatian, other };

      const insertInto = map[targetSection];
      const clampedIndex = Math.max(0, Math.min(targetIndex, insertInto.length));

      insertInto.splice(clampedIndex, 0, { ...dragged, section: targetSection });

      return [...map.deed, ...map.khatian, ...map.other];
    });
  }

  function onDropAt(section: DocSection, index: number) {
    if (!draggingId) return;
    moveItem(draggingId, section, index);
    setOverKey(null);
  }

  function onDropEnd(section: DocSection) {
    if (!draggingId) return;
    const list = bySection[section];
    moveItem(draggingId, section, list.length);
    setOverKey(null);
  }

  function handleBottomDrop(files: FileList) {
    addFiles("other", files);
  }

  function saveAndClose() {
    // TODO: send `items` to backend
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      hideClose
      className="rounded-2xl border border-gray/15 bg-white p-0"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-sm font-bold text-gray">
            Organize &amp; Verify Documents
          </h3>
          <p className="mt-1 text-xs font-semibold text-gray">
            Drag and drop to reorder. Rename files for clarity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="text-gray hover:underline text-xs font-semibold"
        >
          ✕
        </button>
      </div>

      {/* sections */}
      <div className="mt-4">
        <DocSectionBlock
          title="DEED SECTION"
          section="deed"
          list={bySection.deed}
          draggingId={draggingId}
          overKey={overKey}
          setOverKey={setOverKey}
          inputRef={(el) => (fileInputs.current.deed = el)}
          onUploadClick={() => openUpload("deed")}
          onFilesSelected={(files) => addFiles("deed", files)}
          onDropEnd={onDropEnd}
          onDropAt={onDropAt}
          onStartDrag={handleDragStart}
          onEndDrag={handleDragEnd}
          renamingId={renamingId}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          setRenamingId={setRenamingId}
          onCommitRename={commitRename}
          onView={viewItem}
          onDelete={removeItem}
        />

        <DocSectionBlock
          title="KHATIAN SECTION"
          section="khatian"
          list={bySection.khatian}
          draggingId={draggingId}
          overKey={overKey}
          setOverKey={setOverKey}
          inputRef={(el) => (fileInputs.current.khatian = el)}
          onUploadClick={() => openUpload("khatian")}
          onFilesSelected={(files) => addFiles("khatian", files)}
          onDropEnd={onDropEnd}
          onDropAt={onDropAt}
          onStartDrag={handleDragStart}
          onEndDrag={handleDragEnd}
          renamingId={renamingId}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          setRenamingId={setRenamingId}
          onCommitRename={commitRename}
          onView={viewItem}
          onDelete={removeItem}
        />

        <DocSectionBlock
          title="OTHER DOCUMENTS"
          section="other"
          list={bySection.other}
          draggingId={draggingId}
          overKey={overKey}
          setOverKey={setOverKey}
          inputRef={(el) => (fileInputs.current.other = el)}
          onUploadClick={() => openUpload("other")}
          onFilesSelected={(files) => addFiles("other", files)}
          onDropEnd={onDropEnd}
          onDropAt={onDropAt}
          onStartDrag={handleDragStart}
          onEndDrag={handleDragEnd}
          renamingId={renamingId}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          setRenamingId={setRenamingId}
          onCommitRename={commitRename}
          onView={viewItem}
          onDelete={removeItem}
        />

        {/* bottom dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.length) handleBottomDrop(e.dataTransfer.files);
          }}
          onClick={() => openUpload("other")}
          className="mt-4 cursor-pointer rounded-xl border border-dashed border-gray/25 bg-secondary px-4 py-10 text-center"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray/15 bg-white text-gray">
            <Upload size={18} />
          </div>
          <p className="mt-3 text-xs font-semibold text-gray">
            Drop files here or click to browse
          </p>
        </div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-semibold text-gray hover:underline"
          >
            Cancel
          </button>

          <Button size="sm" variant="primary" onClick={saveAndClose}>
            <Save size={16} />
            Save &amp; Reorder
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
