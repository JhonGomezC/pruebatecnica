"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Por favor, selecciona una imagen")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen es demasiado grande. El tamaño máximo es 2MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleRemoveImage = () => {
    onChange("")
  }

  return (
    <div className="space-y-4 w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        data-testid="image-upload-input"
      />

      {!value ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive
              ? "border-primary bg-primary/10"
              : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <ImageIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-medium">Arrastra una imagen o haz clic para seleccionar</p>
              <p className="text-xs text-muted-foreground">PNG, JPG o GIF (máx. 2MB)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="aspect-video relative">
            <Image
              src={value || "/placeholder.svg"}
              alt="Vista previa"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveImage()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {value && (
        <Button type="button" variant="outline" className="w-full gap-2" onClick={handleButtonClick}>
          <Upload className="h-4 w-4" />
          Cambiar imagen
        </Button>
      )}
    </div>
  )
}
