export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="max-w-2xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground space-y-1">
        <p>
          본 서비스는 엔터테인먼트 목적으로 제공되며, 의학적/과학적 근거를 기반으로 하지 않습니다.
        </p>
        <p>
          업로드된 사진은 분석 후 즉시 폐기되며 서버에 저장되지 않습니다.
        </p>
      </div>
    </footer>
  );
}
