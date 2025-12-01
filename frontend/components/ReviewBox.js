// components/ReviewBox.js
"use client";

import Link from "next/link";
import { Icon, Button } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";

export default function ReviewBox({ title, fields = [], editHref, onEdit }) {
  const hasEdit = Boolean(editHref || onEdit);
  const { t } = useLanguage();

  return (
    <section className="rounded-md border border-base bg-base-lighter px-6 py-6 mb-4">
      {/* Header row */}
      <div className="flex items-start">
        {title && (
          <h2 className="text-xl font-bold! text-black!">
            {title}
          </h2>
        )}

        {hasEdit && (
            <div className="ml-auto">
                {editHref ? (
                <Link href={editHref}>
                    <Button type="button" unstyled={false}>
                    <Icon.Edit className="mr-1 h-4 w-4" aria-hidden="true" />
                    Edit
                    </Button>
                </Link>
                ) : (
                <Button type="button" onClick={onEdit}>
                    <Icon.Edit className="mr-1 h-4 w-4" aria-hidden="true" />
                    Edit
                </Button>
                )}
            </div>
            )}
      </div>

      {/* Fields grid */}
      <dl className="mt-4 grid grid-cols-1 gap-x-16 gap-y-4 md:grid-cols-2">
        {fields.map(({ id, label, value }) => (
          <div key={id ?? label}>
            <dt className="text-md font-semibold text-black!">{t(label)}</dt>
            <dd className="mt-1 text-sm font-medium text-black wrap-break-word">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
