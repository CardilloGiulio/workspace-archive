using UnityEngine;

public class DayNightCycle : MonoBehaviour
{
    [Tooltip("How many real seconds a full in-game day lasts.")]
    public float dayDurationInSeconds = 120f;

    private void Update()
    {
        if (dayDurationInSeconds <= 0f)
            return;

        float degreesPerSecond = 360f / dayDurationInSeconds;
        transform.Rotate(Vector3.right, degreesPerSecond * Time.deltaTime);
    }
}