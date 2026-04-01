import { useState } from "react";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { Info } from "lucide-react";

export type BannerProps = {
  /** Main heading shown in the banner */
  title: string;
  /** Optional supporting text below the title (always visible) */
  subtitle?: React.ReactNode;
  /** Extra detail shown when the info icon is opened; defaults to built-in help if omitted */
  information?: React.ReactNode;
  /** Custom action element to display on the right */
  action?: React.ReactNode;
  /** Optional content to render below the banner header */
  children?: React.ReactNode;
  /** Optional class name for the banner header */
  className?: string;
  /** Whether to hide the info icon entirely */
  hideInfo?: boolean;
};

const defaultInformation = (
  <>
    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, opacity: 0.95 }}>
      How to use this dashboard
    </Typography>
    <Typography variant="body2" component="ul" sx={{ m: 0, pl: 2.5, opacity: 0.92 }}>
      <li>Use filters at the top to narrow users, addresses, departments, and divisions.</li>
      <li>Click column headers to sort. The addresses table is paginated (10 per page).</li>
      <li>Record counts update based on your current filters.</li>
    </Typography>
  </>
);

/**
 * Full-width banner with title and an info icon to show or hide extra information.
 */
export default function Banner({
  title,
  subtitle,
  information,
  action,
  children,
  className,
  hideInfo = false,
}: BannerProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Paper
      component={children ? "section" : "header"}
      elevation={2}
      square={!children}
      sx={{
        width: "100%",
        mb: children ? 4 : 2,
        borderRadius: children ? 2 : 0,
        overflow: "hidden",
      }}
    >
      <Box
        className={className}
        sx={{
          display: "flex",
          flexDirection: "column",
          background: (theme) =>
            children
              ? `linear-gradient(135deg, ${theme.palette.secondary?.main || "#475569"} 0%, ${theme.palette.secondary?.dark || "#334155"} 100%)`
              : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "primary.contrastText",
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography
              variant={children ? "h6" : "h4"}
              component={children ? "h2" : "h1"}
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: "#ffffff"
              }}
            >
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  mt: children ? 0 : 1,
                  opacity: 0.92,
                  fontWeight: 400,
                  maxWidth: "48rem",
                  color: "#ffffff"
                }}
              >
                {subtitle}
              </Typography>
            ) : null}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
            {action}
            {!hideInfo && (
              <IconButton
                type="button"
                onClick={() => setInfoOpen((v) => !v)}
                aria-label={infoOpen ? "Hide information" : "Show information"}
                aria-expanded={infoOpen}
                sx={{
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
                }}
              >
                <Info size={24} strokeWidth={2} aria-hidden />
              </IconButton>
            )}
          </Box>
        </Box>

        {!hideInfo && (
          <Collapse in={infoOpen} timeout="auto">
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid rgba(255,255,255,0.28)",
                color: "#ffffff"
              }}
            >
              {information ?? defaultInformation}
            </Box>
          </Collapse>
        )}
      </Box>

      {children && (
        <Box sx={{ backgroundColor: "#ffffff" }}>
          {children}
        </Box>
      )}
    </Paper>
  );
}
