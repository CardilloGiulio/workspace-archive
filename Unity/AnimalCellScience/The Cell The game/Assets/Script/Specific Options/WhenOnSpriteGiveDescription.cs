using UnityEngine;
using TMPro;

public class WhenOnSpriteGiveDescription : MonoBehaviour
{
    [Header("UI References")]
    [Tooltip("Your Canvas (Screen Space – Overlay or Camera)")]
    public Canvas uiCanvas;

    [Tooltip("The RectTransform of your tooltip panel (disabled by default)")]
    public RectTransform tooltipWindow;

    [Header("Content")]
    [TextArea]
    [Tooltip("What shows when you hover")]
    public string description;

    [Header("Style (editable here)")]
    [Tooltip("A TMP Font Asset (optional)")]
    public TMP_FontAsset overrideFont;
    [Tooltip("Point size of the text")]
    public int fontSize = 14;
    [Tooltip("Color of the text")]
    public Color fontColor = Color.white;

    // Internals
    private RectTransform canvasRect;
    private TextMeshProUGUI tooltipText;
    private Vector2 offset = new Vector2(10f, -10f);

    void Start()
    {
        if (uiCanvas == null || tooltipWindow == null)
        {
            Debug.LogError("🛑 Assign both uiCanvas and tooltipWindow in the inspector!");
            enabled = false;
            return;
        }

        canvasRect = uiCanvas.GetComponent<RectTransform>();

        // find the TextMeshProUGUI under the panel—even if it's disabled
        tooltipText = tooltipWindow.GetComponentInChildren<TextMeshProUGUI>(true);
        if (tooltipText == null)
        {
            Debug.LogError("🛑 No TextMeshProUGUI found under tooltipWindow!");
            enabled = false;
            return;
        }

        // hide at start
        tooltipWindow.gameObject.SetActive(false);
    }

    void OnMouseEnter()
    {
        Debug.Log("Tooltip ▶ OnMouseEnter fired on " + name);
        tooltipText.text = description;
        tooltipWindow.gameObject.SetActive(true);
        UpdateTooltipPosition();
    }

    void OnMouseExit()
    {
        Debug.Log("Tooltip ◀ OnMouseExit fired on " + name);
        tooltipWindow.gameObject.SetActive(false);
    }

    void Update()
    {
        if (tooltipWindow.gameObject.activeSelf)
            UpdateTooltipPosition();
    }

    void UpdateTooltipPosition()
    {
        if (uiCanvas.renderMode == RenderMode.ScreenSpaceOverlay)
        {
            // world‐space pos = mouse position on screen
            tooltipWindow.position = (Vector3)Input.mousePosition + (Vector3)offset;
        }
        else
        {
            // convert screen‐point into local Canvas space
            Vector2 localPoint;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(
                canvasRect,
                Input.mousePosition,
                uiCanvas.worldCamera,
                out localPoint
            );
            tooltipWindow.anchoredPosition = localPoint + offset;
        }
    }
}
